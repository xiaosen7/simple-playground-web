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
  Observable,
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
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { IProjectTemplate } from "@simple-playground-web/types";

export interface IPlaygroundOptions {
  globalExternals?: Record<string, any>;
  /**
   * The entry file to be built and auto selected, can be absolute path or relative path, if not set, it will be auto resolved from cwd in these files: ["./index.ts", "./index.tsx", "./src/index.ts", "./src.index.tsx"]
   */
  entry?: string;
  /**
   * The input of esbuild, can be glob pattern
   * @default  [
        join(options.cwd, "**\/*"),
        join(options.cwd, "\/*"),
        "/node_modules\/**\/*.js",
      ]
   */
  buildInputPattern?: string[];
  /**
   * @default {}
   */
  buildOptions?: Omit<IBuildOptions, "entry" | "input" | "globalExternals">;
  /**
   * @default  [
        join(options.cwd, "**\/*"),
        join(options.cwd, "\/*"),
      ]
   */
  directoryTreePathsPattern?: string[];
  /**
   * @default "/"
   */
  cwd: string;
  // template?: IProjectTemplate | string;
}

enum EBuildState {
  Start,
  LoadingEsbuildWasm,
  Building,
  Error,
  Done,
}

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

  loading$ = new BehaviorSubject(true);
  fs$: Observable<string | void>;
  debouncedFs$: Observable<string | void>;
  buildState$ = new BehaviorSubject<EBuildState>(EBuildState.Start);
  selectedPath$ = new BehaviorSubject<string>("");
  // @ts-ignore
  buildResult$ = new BehaviorSubject<IBuildResult | undefined>(undefined);

  #logger: Logger;
  #subscription = new Subscription();
  #options: Required<IPlaygroundOptions>;

  private constructor(options: IPlaygroundOptions) {
    const DEFAULT_OPTIONS = {
      buildInputPattern: [
        join(options.cwd, "**/*"),
        join(options.cwd, "*"),
        "/node_modules/**/*.js",
      ],
      buildOptions: {},
      globalExternals: {},
      directoryTreePathsPattern: [
        join(options.cwd, "**/*"),
        join(options.cwd, "*"),
      ],
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

    this.explore = new Explore(this.#options.cwd);
    this.id = this.#options.cwd;
    this.cwd = this.#options.cwd;

    this.#logger = new Logger(`playground-${this.id}`);

    this.fs$ = merge(this.explore.newFile$, this.explore.change$);
    this.debouncedFs$ = this.fs$.pipe(debounceTime(200));

    this.debouncedFs$.subscribe(() => this.loading$.next(false));

    // auto build when content change
    this.#subscription.add(
      this.editor.contentChange$
        .pipe(debounceTime(500))
        .subscribe(([filePath, value]) => {
          if (!filePath || !insideDir(filePath, this.#options.cwd)) {
            return;
          }

          this.explore.writeFileSync(filePath, value);
        })
    );

    // render code in editor when there is a new entry file
    this.#subscription.add(
      this.explore.newFile$
        .pipe(filter((value) => value === this.#options.entry))
        .subscribe(() => {
          this.editor.renderPath(this.#options.entry);
        })
    );

    // auto render code in editor when selected path changes
    this.#subscription.add(
      this.selectedPath$.subscribe((path) => {
        this.#logger.log("selectedPath$", path);
        this.editor.renderPath(this.explore.resolve(path));
      })
    );

    // build
    this.#subscription.add(this.debouncedFs$.subscribe(() => this.build()));

    // entry
    this.#subscription.add(
      this.explore.newFile$.subscribe((path) => {
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
          !this.selectedPath$.value &&
          this.#options.entry !== "" &&
          this.explore.resolve(path) === this.#options.entry
        ) {
          this.#logger.log("auto select entry", this.getEntryPathRelativeCwd());
          this.selectedPath$.next(this.getEntryPathRelativeCwd());
        }
      })
    );
  }

  getDirectoryTreePaths() {
    const paths = project.fs
      .globSync(this.#options.directoryTreePathsPattern, {
        onlyFiles: false,
      })
      .map((x) => relative(this.#options.cwd, x));
    return paths;
  }

  async build() {
    this.#logger.timeAsyncFn(() => this.#build(), "build");
  }

  async #build() {
    this.buildState$.next(EBuildState.LoadingEsbuildWasm);
    this.#logger.log("loading esbuild.wasm...");
    await bundler.load();
    this.buildState$.next(EBuildState.Building);
    this.#logger.log("building...");
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
      this.#logger.log("build error");
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
      this.#logger.log("build error");
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
          this.#logger.log("build error");
          return;
        }

        this.#logger.log("build success");

        this.buildState$.next(EBuildState.Done);

        const lastBuildHash = this.buildResult$.getValue()?.hash;
        if (lastBuildHash === result.hash) {
          this.#logger.log("hash equals");
          return;
        }

        this.buildResult$.next(result);

        const { css, js, globalExternals } = result;
        this.previewer.updateSources({
          scripts: [
            {
              id: "externals",
              content: `var module = {exports: { default: {} }};
          function require (name) {
            var value = module.exports[name] || (module.exports.default ? module.exports.default[name] : null);
            if (value) {
              value.__esModule = true;
              return value;
            }
          
            throw new Error("module not found: " + name);
          }
          
          ${project.template.externals?.cjsCode ?? ""}
            `,
            },
            { id: "build", content: js ?? "" },
          ],
          styles: [
            {
              id: "externals",
              content: project.template.externals?.cssCode ?? "",
            },
            { id: "build", content: css ?? "" },
          ],
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

  async download() {
    const zip = new JSZip();
    const paths = this.getDirectoryTreePaths();
    paths.forEach((path) => {
      if (this.explore.isDirectory(path)) {
        return;
      }

      zip.file(path, this.explore.readFileSync(path, "utf-8"));
    });
    return zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "playground.zip");
    });
  }
}
