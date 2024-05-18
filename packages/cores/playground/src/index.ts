import { project } from "@simple-playground-web/project";
import { Editor, Previewer } from "@simple-playground-web/renderers";
import {
  bundler,
  IBuildOptions,
  IBuildResult,
} from "@simple-playground-web/bundler";
import { debounce, isNil, omitBy, set, uniqueId } from "lodash-es";
import {
  BehaviorSubject,
  ReplaySubject,
  Subject,
  Subscription,
  debounceTime,
  filter,
  merge,
} from "rxjs";
import {
  insideDir,
  isAbsolute,
  join,
  relative,
} from "@simple-playground-web/path";
import { OptionalKeysOf } from "type-fest";
import { Explore } from "./explore";
import { Logger } from "@simple-playground-web/logger";

export interface IPlaygroundOptions {
  globalExternals?: Record<string, any>;
  entry?: string;
  /**
   * The input of esbuild, can be glob pattern
   * @default  [
        join(options.cwd, "**\/*"),
        "/node_modules\/**\/*.js",
      ]
   */
  buildInputPattern?: string[];
  /**
   * @default {}
   */
  buildOptions?: Omit<IBuildOptions, "entry" | "input" | "globalExternals">;
  /**
   * @default [join(options.cwd, '**\/*')]
   */
  directoryTreePathsPattern?: string[];
  /**
   * @default "/"
   */
  cwd: string;
}

enum EBuildState {
  Start,
  LoadingEsbuildWasm,
  Building,
  Error,
  Done,
}

/**
 * TODO auto entry
 */
export class Playground {
  static #playgroundMap = new Map<string, Playground>();

  static create(options: IPlaygroundOptions) {
    if (this.#playgroundMap.has(options.cwd)) {
      return this.#playgroundMap.get(options.cwd)!;
    }

    const playground = new Playground(options);
    this.#playgroundMap.set(options.cwd, playground);
    return playground!;
  }

  EBuildState = EBuildState;

  readonly id: string;
  readonly cwd: string;
  editor = new Editor();
  previewer = new Previewer();
  explore: Explore;

  /**
   * The tree paths relative to cwd
   */
  directoryTreePaths$ = new ReplaySubject<string[]>();
  buildState$ = new BehaviorSubject<EBuildState>(EBuildState.Start);
  selectedPath$ = new ReplaySubject<string>();
  // @ts-ignore
  buildResult$ = new BehaviorSubject<IBuildResult | undefined>(undefined);
  newFile$ = new ReplaySubject<string>();

  #logger: Logger;
  #subscription = new Subscription();
  #options: Required<IPlaygroundOptions>;

  private constructor(options: IPlaygroundOptions) {
    const DEFAULT_OPTIONS = {
      buildInputPattern: [join(options.cwd, "**/*"), "/node_modules/**/*.js"],
      buildOptions: {},
      globalExternals: {},
      directoryTreePathsPattern: [join(options.cwd, "**/*")],
    } as const satisfies Pick<
      IPlaygroundOptions,
      OptionalKeysOf<IPlaygroundOptions>
    >;

    this.#options = {
      ...DEFAULT_OPTIONS,
      ...(omitBy(options, isNil) as IPlaygroundOptions),
      entry: options.entry
        ? isAbsolute(options.entry)
          ? options.entry
          : join(options.cwd, options.entry)
        : "",
    };

    this.id = this.#options.cwd;
    this.cwd = this.#options.cwd;

    this.explore = new Explore(this.#options.cwd);
    this.#logger = new Logger(this.id);

    const newFileOrExplore$ = merge(this.newFile$, this.explore.change$);

    // auto build when content change
    this.#subscription.add(
      this.editor.contentChange$
        .pipe(debounceTime(500))
        .subscribe(([filePath, value]) => {
          if (!filePath || !insideDir(filePath, this.#options.cwd)) {
            return;
          }

          project.fs.writeFileSync(filePath, value);
          this.build();
        })
    );

    // render code in editor when there is a new entry file
    this.#subscription.add(
      this.newFile$
        .pipe(filter((value) => value === this.#options.entry))
        .subscribe(() => {
          this.editor.renderPath(this.#options.entry);
        })
    );

    // auto render code in editor when selected path changes
    this.#subscription.add(
      this.selectedPath$.subscribe((path) => {
        this.#logger.log("selectedPath$", path, project.fs.data);
        this.editor.renderPath(this.explore.resolve(path));
      })
    );

    // build
    this.#subscription.add(
      newFileOrExplore$.pipe(debounceTime(200)).subscribe(() => this.build())
    );

    // directory tree paths
    this.#subscription.add(
      newFileOrExplore$.pipe(debounceTime(200)).subscribe(() => {
        const paths = project.fs
          .globSync(this.#options.directoryTreePathsPattern, {
            onlyFiles: false,
          })
          .map((x) => relative(this.#options.cwd, x));

        this.#logger.log("directoryTreePaths$", paths);
        this.directoryTreePaths$.next(paths);
      })
    );

    // event: new file in cwd
    this.#subscription.add(
      project.newFile$
        .pipe(filter((path) => insideDir(path, this.#options.cwd)))
        .subscribe((path) => {
          this.#logger.log(`new file ${path}`);
          this.newFile$.next(path);
        })
    );

    // entry
    this.#subscription.add(
      this.newFile$.subscribe((path) => {
        if (!this.#options.entry) {
          // auto resolve entry
          if (
            ["index.ts", "index.tsx", "src/index.ts", "src/index.tsx"]
              .map((x) => this.explore.resolve(x))
              .includes(this.explore.resolve(path))
          ) {
            this.#options.entry = this.explore.resolve(path);
          }
        }

        if (
          this.#options.entry !== "" &&
          this.explore.resolve(path) === this.#options.entry
        ) {
          this.selectedPath$.next(this.getEntryPathRelativeCwd());
        }
      })
    );
  }

  async build() {
    this.buildState$.next(EBuildState.LoadingEsbuildWasm);
    await bundler.load();
    this.buildState$.next(EBuildState.Building);
    const {
      globalExternals = {},
      buildInputPattern,
      buildOptions,
    } = this.#options;

    const input = Object.entries(
      project.fs.getFilesByPattern(buildInputPattern)
    ).reduce(
      (files, [path, content]) => {
        files[this.explore.relative(path)] = content;
        return files;
      },
      {} as Record<string, string>
    );

    if (!project.fs.existsSync(this.#options.entry)) {
      this.buildState$.next(EBuildState.Error);
      this.buildResult$.next({
        buildError: new Error(
          `Entry file "${this.getEntryPathRelativeCwd()}" not found`
        ),
        css: "",
        errors: [],
        hash: "",
        js: "",
      });
      return;
    }

    if (!project.fs.statSync(this.#options.entry).isFile()) {
      this.buildState$.next(EBuildState.Error);
      this.buildResult$.next({
        buildError: new Error(
          `Entry file "${this.getEntryPathRelativeCwd()}" is not a file`
        ),
        css: "",
        errors: [],
        hash: "",
        js: "",
      });
      return;
    }

    return bundler
      .build({
        input,
        entry: this.getEntryPathRelativeCwd(),
        globalExternals,
        ...buildOptions,
      })
      .then((result) => {
        if (result.errors.length > 0 || result.buildError) {
          this.buildState$.next(EBuildState.Error);
          this.buildResult$.next(result);
          return;
        }

        this.buildState$.next(EBuildState.Done);

        const lastBuildHash = this.buildResult$.getValue()?.hash;
        if (lastBuildHash === result.hash) {
          return;
        }

        this.buildResult$.next(result);

        const { css, js, globalExternals } = result;
        this.previewer.updateSources({
          globals: globalExternals,
        });
        this.previewer.updateSources({
          scripts: [
            {
              id: "externals",
              content: `var module = {exports: { default: {} }};
          function require (name) {
            var value = module.exports[name] || (module.exports.default ? module.exports.default[name] : null);
            if (value) {
              return value;
            }
          
            throw new Error("module not found: " + name);
          }
          
          ${project.template.externals.cjsCode}
            `,
            },
            { id: "build", content: js ?? "" },
          ],
          styles: [{ id: "build", content: css ?? "" }],
          globals: globalExternals,
        });
      });
  }

  destroy() {
    this.#subscription.unsubscribe();
    this.editor.dispose();
    this.previewer.dispose();
  }

  getEntryPathRelativeCwd() {
    return this.explore.relative(this.#options.entry);
  }
}
