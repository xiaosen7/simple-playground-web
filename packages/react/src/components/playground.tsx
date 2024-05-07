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
import { createFilterPattern } from "@simple-playground-web/path";
import { Loading } from "./loading";

const createPlayground = (options: {
  files: Record<string, string>;
  globals?: Record<string, ISafeAny>;
  entry: string;
  buildInputPattern: string | string[];
  wasmUrl: string;
}) => {
  const { entry, files, globals = {}, buildInputPattern, wasmUrl } = options;

  Object.entries(files).forEach(([path, content]) => {
    project.writeFile(path, content);
  });

  const editor = new Editor();
  editor.renderPath(entry);
  const previewer = new Previewer();
  previewer.updateSources({
    globals: {
      __globals: globals,
    },
  });

  const bundler = new Bundler(wasmUrl);

  const build = () => {
    return bundler
      .build({
        input: project.getSourcesFromPattern(buildInputPattern),
        entry,
        globalExternals: Object.entries(globals).reduce(
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

export interface IPlaygroundProps {
  files: Record<string, string>;
  entry: string;
  globalExternals?: Record<string, ISafeAny>;
  /**
   * The input of esbuild, can be glob pattern
   */
  buildInputPattern: string | string[];
  /**
   * The url of esbuild.wasm
   */
  wasmUrl: string;
}
export function Playground(props: IPlaygroundProps) {
  const {
    files,
    entry,
    globalExternals: globals,
    buildInputPattern,
    wasmUrl,
  } = props;

  const [loading, setLoading] = React.useState(false);
  const { editor, previewer, build } = useMemo(
    () =>
      createPlayground({
        files,
        globals,
        entry,
        buildInputPattern: buildInputPattern,
        wasmUrl,
      }),
    [files, buildInputPattern]
  );
  const [editorRef, previewerRef] = [useRef(null), useRef(null)];

  useMount(() => {
    editorRef.current && editor.render(editorRef.current);
    previewerRef.current && previewer.render(previewerRef.current);

    debouncedBuild();
  });

  const { run: debouncedBuild } = useDebounceFn(
    () => {
      setLoading(true);
      build().finally(() => setLoading(false));
    },
    { wait: 500 }
  );

  useSubs(editor.contentChange$, debouncedBuild);

  const paths = useMemo(() => {
    const filter = createFilterPattern(["**/*", "!**/node_modules/**"]);
    return Object.keys(files).filter(filter);
  }, [files]);

  return (
    <div className="flex h-full">
      <div className="w-1/6 h-full overflow-auto bg-[#242322] text-white p-4">
        <DirectoryTree
          defaultSelectedPath={entry}
          onFileSelect={(path) => editor.renderPath(path)}
          paths={paths}
        />
      </div>

      <div className="flex-1 flex h-full">
        <div className="w-1/2 h-full overflow-auto" ref={editorRef}></div>
        <Loading loading={loading} tip="Building..." className="w-1/2 h-full ">
          <div className="h-full overflow-auto" ref={previewerRef}></div>
        </Loading>
      </div>
    </div>
  );
}
