import { useEffect, useMemo, useRef } from "react";
import { useDebounceFn, useMount } from "ahooks";
import * as React from "react";
import { useObservable, useSubs } from "../hooks";
import classNames from "classnames";
import { Explore } from "./explore";
import {
  IPlaygroundOptions,
  Playground as PlaygroundModel,
} from "@simple-playground-web/playground";
import { PlaygroundProvider, PlaygroundProviderBuilder } from "../provider";
import { BuildInfo } from "./build-info";
import { Editor } from "./editor";
import { Previewer } from "./previewer";
import { usePlayground } from "../hooks/playground";
import { omit } from "lodash-es";
import { PlaygroundContext } from "../context";
import { Paper, Stack, Typography } from "@mui/material";
import {
  CreateFile,
  CreateFolder,
  Delete,
  FormatCode,
  Redo,
  ReloadPreviewer,
  Rename,
  RequestPreviewerFullScreen,
  Undo,
} from "./actions";
import DockLayout, { LayoutData, DividerBox } from "rc-dock";
import "rc-dock/dist/rc-dock.css";
import { IComponentProps } from "./types";
import { project } from "@simple-playground-web/project";
import { filter } from "rxjs";

export interface IPlaygroundProps extends IPlaygroundOptions {
  className?: string;
  style?: React.CSSProperties;
}
export const Playground = React.memo(
  (props: IPlaygroundProps) => {
    const { className, style } = props;

    return (
      <PlaygroundProviderBuilder {...omit(props, ["className", "style"])}>
        <PlaygroundUI className={className} style={style} />
      </PlaygroundProviderBuilder>
    );
  },
  (oldProps, newProps) => {
    const deepEqualKeys: Array<keyof IPlaygroundProps> = [
      "globalExternals",
      "buildOptions",
    ];

    return Object.keys(oldProps).every(
      // @ts-ignore
      (key: keyof IPlaygroundProps) => {
        if (deepEqualKeys.includes(key)) {
          return oldProps[key] === newProps[key];
        }

        return JSON.stringify(oldProps[key]) === JSON.stringify(newProps[key]);
      }
    );
  }
);

const PlaygroundUI = (props: IComponentProps) => {
  const { className, style } = props;
  console.log({ className, style });
  const playground = usePlayground();
  const selectedFilePath = useObservable(
    playground.selectedPath$.pipe(
      filter((x) => project.fs.statSync(playground.explore.resolve(x)).isFile())
    )
  );

  // Do not destroy playground because it may be used in other places

  return (
    <Paper
      style={style}
      elevation={3}
      className={classNames("border border-gray-300 border-solid", className)}
    >
      <DividerBox mode="horizontal" className="h-full">
        <div className="flex flex-col w-1/5">
          <Stack direction={"row"} className="overflow-scroll">
            <Rename />
            <CreateFile />
            <CreateFolder />
            <Delete />
            <Undo />
            <Redo />
          </Stack>
          <Explore className="flex-1 border-0 border-t border-solid border-gray-200" />
        </div>

        <div className="flex flex-col border-0 border-r border-l border-solid border-gray-200 w-2/5">
          <Stack
            direction={"row"}
            alignItems={"center"}
            paddingX={1}
            justifyContent={"space-between"}
          >
            <Typography>{selectedFilePath}</Typography>
            <Stack direction={"row"}>
              <FormatCode />
            </Stack>
          </Stack>

          <Editor className="flex-1 min-h-24 border-0 border-t border-b border-solid border-gray-200" />

          <div>
            <BuildInfo />
          </div>
        </div>

        <div className="flex flex-col w-2/5">
          <Stack direction={"row"} className="overflow-scroll">
            <RequestPreviewerFullScreen />
            <ReloadPreviewer />
          </Stack>
          <Previewer className="overflow-auto flex-1 border-0 border-t border-solid border-gray-200" />
        </div>
      </DividerBox>
    </Paper>
  );
};
