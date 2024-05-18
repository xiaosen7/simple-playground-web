import React, { CSSProperties, useRef } from "react";
import { IComponentProps } from "./types";
import { useMount } from "ahooks";
import { usePlayground } from "../hooks/playground";
import { useSubs } from "../hooks";

export interface IEditorProps extends IComponentProps {}

export function Editor(props: IEditorProps) {
  const editorRef = useRef(null);
  const playground = usePlayground();

  useMount(() => {
    playground.editor.render(editorRef.current!);
  });

  return <div aria-label="editor" {...props} ref={editorRef}></div>;
}
