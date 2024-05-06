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

const createPlayground = (options: {
  files: Record<string, string>;
  globals?: Record<string, ISafeAny>;
  entry: string;
  input: string;
  wasmUrl: string;
}) => {
  const { entry, files, globals = {}, input, wasmUrl } = options;

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
    bundler
      .build({
        input: project.getSourcesFromPattern(input),
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
  buildInput: string;
  wasmUrl: string;
}
export function Playground(props: IPlaygroundProps) {
  const { files, entry, globalExternals: globals, buildInput, wasmUrl } = props;
  const paths = useMemo(() => Object.keys(files), [files]);
  const { editor, previewer, build } = useMemo(
    () =>
      createPlayground({
        files,
        globals,
        entry,
        input: buildInput,
        wasmUrl,
      }),
    [files]
  );
  const [editorRef, previewerRef] = [useRef(null), useRef(null)];

  useMount(() => {
    editorRef.current && editor.render(editorRef.current);
    previewerRef.current && previewer.render(previewerRef.current);

    debouncedBuild();
  });

  const { run: debouncedBuild } = useDebounceFn(build, { wait: 500 });

  useSubs(editor.contentChange$, debouncedBuild);

  return (
    <div className="flex h-full">
      <div className="w-1/6 h-full bg-[#242322] text-white p-4">
        <DirectoryTree
          defaultSelectedPath={entry}
          onFileSelect={(path) => editor.renderPath(path)}
          paths={paths}
        />
      </div>

      <div className="flex-1 flex h-full">
        <div className="w-1/2 h-full overflow-auto" ref={editorRef}></div>
        <div className="w-1/2 h-full overflow-auto" ref={previewerRef}></div>
      </div>
    </div>
  );
}
