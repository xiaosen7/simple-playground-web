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

  // This is to fix a bug in rc-dock-layout, i don't know why this bug appears
  useSubs(fullscreenChange$, () => {
    playground.editor.layout();
  });

  useMount(() => {
    // @ts-ignore
    window.playground = playground;
    playground.editor.render(editorRef.current!);
    // playground.editor.layout();
    const resize$ = merge(
      fromEvent(editorRef.current!, "resize"),
      fromEvent(window, "resize")
    ).pipe(debounceTime(200));
    const subs = resize$.subscribe(() => {
      console.log("resize");
      playground.editor.layout();
    });

    return () => subs.unsubscribe();
  });

  return (
    <div
      aria-label="editor"
      {...props}
      ref={editorRef}
      className={classNames("p-1", props.className)}
    ></div>
  );
}
