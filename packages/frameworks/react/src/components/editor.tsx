import React, { CSSProperties, useRef } from "react";
import { IComponentProps } from "./types";
import { useMount } from "ahooks";
import { usePlayground } from "../hooks/playground";
import { useSubs } from "../hooks";
import classNames from "classnames";

export interface IEditorProps extends IComponentProps {}

export function Editor(props: IEditorProps) {
  const editorRef = useRef(null);
  const playground = usePlayground();

  useMount(() => {
    // @ts-ignore
    window.playground = playground;
    playground.editor.render(editorRef.current!);
  });

  return (
    <div
      aria-label="editor"
      {...props}
      ref={editorRef}
      className={classNames("overflow-hidden", "p-1", props.className)}
    ></div>
  );
}
