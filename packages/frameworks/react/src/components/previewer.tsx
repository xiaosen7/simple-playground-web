import React, { useRef, useState } from "react";
import { IComponentProps } from "./types";
import { useMount } from "ahooks";
import { usePlayground } from "../hooks/playground";
import { useObservable, useSubs } from "../hooks";
import { Button, CircularProgress, Stack } from "@mui/material";
import classNames from "classnames";
import { AiOutlineReload } from "react-icons/ai";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";

export interface IPreviewerProps extends IComponentProps {}

export function Previewer(props: IPreviewerProps) {
  const previewerRef = useRef(null);
  const playground = usePlayground();

  const [errors, setErrors] = useState<string[]>();

  useSubs(playground.previewer.error$, (error) => {
    setErrors([...(errors || []), error]);
  });

  useSubs(playground.buildState$, (state) => {
    if (state === playground.EBuildState.Done) {
      setErrors([]);
    }
  });

  useMount(() => {
    playground.previewer.render(previewerRef.current!);
  });

  return (
    <div aria-label="preview" {...props} ref={previewerRef}>
      <div className="text-red-500">{errors?.join("\n")}</div>
    </div>
  );
}
