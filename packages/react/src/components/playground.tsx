import { project } from "@simple-playground-web/project";
import { Editor, Previewer } from "@simple-playground-web/ui";
import { Bundler } from "@simple-playground-web/bundler";
import { useEffect, useMemo, useRef } from "react";
import { useDebounceFn, useMount } from "ahooks";
import * as React from "react";
import { set } from "lodash-es";
import { useSubs } from "../hooks";
import { DirectoryTree } from "./directory-tree";
import { ISafeAny } from "../../../types/src";
import { Loading } from "./loading";
import { PlaygroundContext } from "../context";
import { debounce, debounceTime, filter } from "rxjs";
import { join } from "@simple-playground-web/path";
import classNames from "classnames";

interface ICreatePlaygroundOptions {
  // files: Record<string, string>;
  globalExternals?: Record<string, ISafeAny>;
  entry: string;
  /**
   * The input of esbuild, can be glob pattern
   */
  buildInputPattern?: string[];
  bundler: Bundler;
}
const createPlayground = (options: ICreatePlaygroundOptions) => {
  const { entry, globalExternals = {}, buildInputPattern, bundler } = options;

  const editor = new Editor();
  const previewer = new Previewer();
  previewer.updateSources({
    globals: {
      __globals: globalExternals,
    },
  });

  const build = () => {
    const input = project.getFilesFromPattern(buildInputPattern);
    return bundler
      .build({
        input,
        entry,
        globalExternals: Object.entries(globalExternals).reduce(
          (ret, [name]) => set(ret, name, `__globals["${name}"]`),
          {} as Record<string, string>
        ),
      })
      .then(({ css, js }) => {
        previewer.updateSources({
          scripts: [{ id: "build", content: js ?? "" }],
          styles: [{ id: "build", content: css ?? "" }],
        });
      });
  };

  return {
    project,
    editor,
    previewer,
    build,
  };
};

export interface IPlaygroundProps
  extends Omit<ICreatePlaygroundOptions, "bundler"> {
  /**
   * @default "!**\/node_modules\/**"
   */
  directoryTreePathsPattern?: string[];
  cwd: string;
  className?: string;
  style?: React.CSSProperties;
}
export const Playground = React.memo(
  (props: IPlaygroundProps) => {
    const {
      entry,
      globalExternals,
      buildInputPattern,
      directoryTreePathsPattern,
      cwd,
      className,
      style,
    } = props;

    return (
      <NormalizedPropsPlayground
        className={className}
        style={style}
        cwd={cwd}
        entry={entry.startsWith("/") ? entry : join(cwd, entry)}
        buildInputPattern={
          buildInputPattern?.map((x) =>
            x.startsWith("/") ? x : join(cwd, x)
          ) ?? [join(cwd, "**/*")]
        }
        directoryTreePathsPattern={directoryTreePathsPattern?.map((x) =>
          x.startsWith("/") ? x : join(cwd, x)
        )}
        globalExternals={globalExternals}
      />
    );
  },
  (oldProps, newProps) => {
    const deepEqualKeys: Array<keyof ICreatePlaygroundOptions> = [
      "globalExternals",
    ];

    return Object.keys(oldProps).every(
      (key: keyof ICreatePlaygroundOptions) => {
        if (deepEqualKeys.includes(key)) {
          return oldProps[key] === newProps[key];
        }

        return JSON.stringify(oldProps[key]) === JSON.stringify(newProps[key]);
      }
    );
  }
);

const NormalizedPropsPlayground = React.memo(
  (props: IPlaygroundProps) => {
    const {
      entry,
      globalExternals,
      buildInputPattern,
      directoryTreePathsPattern,
      cwd,
      className,
      style,
    } = props;
    const { bundler } = React.useContext(PlaygroundContext);

    const [directoryTreePaths, setDirectoryTreePaths] = React.useState<
      string[]
    >([]);
    const [loading, setLoading] = React.useState(false);
    const playground = useMemo(
      () =>
        createPlayground({
          globalExternals,
          entry,
          buildInputPattern,
          bundler,
        }),
      [buildInputPattern, globalExternals, entry, bundler]
    );
    const [editorRef, previewerRef] = [useRef(null), useRef(null)];

    useMount(() => {
      playground.editor.render(editorRef.current);
      playground.previewer.render(previewerRef.current);
    });

    const { run: debouncedBuild } = useDebounceFn(
      () => {
        setLoading(true);
        playground.build().finally(() => setLoading(false));
      },
      { wait: 500 }
    );

    useSubs(playground.editor.contentChange$, debouncedBuild);
    useSubs(project.newFile$.pipe(debounceTime(500)), () => {
      const paths = project.getPaths(directoryTreePathsPattern);
      setDirectoryTreePaths(
        paths.filter((x) => x.startsWith(cwd)).map((x) => x.replace(cwd, ""))
      );
    });
    useSubs(project.newFile$.pipe(filter((value) => value === entry)), () => {
      playground.editor.renderPath(entry);
    });
    useSubs(project.newFile$, debouncedBuild);

    return (
      <div
        aria-label={"playground"}
        className={classNames(
          "flex border border-gray-300 border-solid",
          className
        )}
        style={style}
      >
        <div className="w-1/6 h-full overflow-auto bg-[#242322] text-white p-4">
          <DirectoryTree
            defaultSelectedPath={entry.replace(cwd, "")}
            onSelectPath={(path) => {
              playground.editor.renderPath(join(cwd, path));
            }}
            paths={directoryTreePaths}
          />
        </div>

        <div className="flex-1 flex h-full">
          <div className="w-1/2 h-full overflow-auto" ref={editorRef}></div>
          <Loading
            loading={loading}
            tip="Building..."
            className="w-1/2 h-full "
          >
            <div className="h-full overflow-auto" ref={previewerRef}></div>
          </Loading>
        </div>
      </div>
    );
  },
  (oldProps, newProps) => {
    const deepEqualKeys: Array<keyof ICreatePlaygroundOptions> = [
      "globalExternals",
    ];

    return Object.keys(oldProps).every(
      (key: keyof ICreatePlaygroundOptions) => {
        if (deepEqualKeys.includes(key)) {
          return oldProps[key] === newProps[key];
        }

        return JSON.stringify(oldProps[key]) === JSON.stringify(newProps[key]);
      }
    );
  }
);
