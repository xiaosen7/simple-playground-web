import React from "react";
import { usePlayground } from "../hooks/playground";
import { useObservable } from "../hooks";
import { VscWarning, VscCheck } from "react-icons/vsc";
import { useMemoizedFn } from "ahooks";
import { IComponentProps } from "./types";
import classNames from "classnames";
import { Button, CircularProgress } from "@mui/material";

export interface IBuildInfoProps extends IComponentProps {}

export const BuildInfo: React.FC<IBuildInfoProps> = (
  props: IBuildInfoProps
) => {
  const playground = usePlayground();
  const state = useObservable(playground.buildState$);
  const result = useObservable(playground.buildResult$);

  const getContent = useMemoizedFn(() => {
    switch (state) {
      case playground.EBuildState.LoadingEsbuildWasm:
        return (
          <>
            <CircularProgress size={14} /> Loading esbuild.wasm...
          </>
        );

      case playground.EBuildState.Building:
        return (
          <>
            <CircularProgress size={14} />
            Building...
          </>
        );

      case playground.EBuildState.Done:
        return (
          <div className="flex items-center gap-1 text-green-500">
            <VscCheck /> <div>Build success.</div>
          </div>
        );

      case playground.EBuildState.Error:
        let errorString = "";
        errorString +=
          result?.errors
            .map((message) => {
              return message.text;
            })
            .join("\n") ?? "";

        if (result?.buildError) {
          errorString += `${result?.buildError.message}`;
        }

        return (
          <div className="flex gap-1 text-red-500">
            <VscWarning className="mt-1" />
            <div className="flex-1">
              {errorString}
              <Button size="small" onClick={() => playground.build()}>
                Rebuild
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  });

  return (
    <div
      className={classNames("overflow-auto px-2", props.className)}
      style={props.style}
    >
      {getContent()}
    </div>
  );
};
