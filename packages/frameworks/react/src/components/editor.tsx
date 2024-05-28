import React, { CSSProperties, useRef } from "react";
import { IComponentProps } from "./types";
import { useMount } from "ahooks";
import { usePlayground } from "../hooks/playground";
import { useSubs } from "../hooks";
import classNames from "classnames";
import { debounceTime, fromEvent, merge } from "rxjs";

export interface IEditorProps extends IComponentProps {}

const fullscreenChange$ = fromEvent(document, "fullscreenchange");

export function Editor(props: IEditorProps) {
  const editorRef = useRef(null);
  const playground = usePlayground();

  useMount(() => {
    playground.editor.render(editorRef.current!);
    const resize$ = merge(fromEvent(window, "resize")).pipe(debounceTime(50));
    const subs = resize$.subscribe(() => {
      playground.editor.layout();
    });

    return () => subs.unsubscribe();
  });

  console.log("render");

  return (
    <div
      aria-label="editor"
      {...props}
      ref={editorRef}
      className={classNames("p-1", props.className)}
    ></div>
  );
}
