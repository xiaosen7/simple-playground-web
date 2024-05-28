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
import {
  Button,
  CircularProgress,
  Fade,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CreateFile,
  CreateFolder,
  Delete,
  Download,
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
import { SelectedPath } from "./selected-path";
import { basename, dirname } from "@simple-playground-web/path";
import { ExploreMenu, PreviewerMenu } from "./menus";

export interface IPlaygroundProps
  extends IPlaygroundOptions,
    PlaygroundUIProps {}
export const Playground = React.memo(
  (props: IPlaygroundProps) => {
    const { className, style, renderTitle, ...builderProps } = props;

    return (
      <PlaygroundProviderBuilder {...builderProps}>
        <PlaygroundUI
          className={className}
          style={style}
          renderTitle={renderTitle}
        />
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

interface PlaygroundUIProps extends IComponentProps {
  renderTitle?: (originalNode: React.ReactNode) => React.ReactNode;
}
const PlaygroundUI = (props: PlaygroundUIProps) => {
  const { className, style, renderTitle = (x) => x } = props;
  const playground = usePlayground();

  // Do not destroy playground because it may be used in other places
  const loading = useObservable(playground.loading$);

  return (
    <DividerBox
      key={playground.cwd}
      mode="horizontal"
      style={style}
      className={classNames(
        "border border-solid border-gray-300 relative",
        loading && "cursor-wait",
        className
      )}
    >
      <div className="flex flex-col w-1/5 border-0 border-r border-solid border-gray-300">
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? "200ms" : "0ms",
          }}
          unmountOnExit
        >
          <LinearProgress
            style={{ position: "absolute" }}
            className="w-full left-0 top-0"
          />
        </Fade>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          overflow={"auto"}
        >
          {renderTitle(
            <Button style={{ cursor: "default" }} variant="text">
              {basename(playground.cwd)}
            </Button>
          )}
          <ExploreMenu />
        </Stack>
        <Explore className="border-0 border-t border-solid border-gray-300" />
      </div>

      <Stack className="w-2/5 border-0 border-r border-l border-solid border-gray-300">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          overflow={"scroll"}
        >
          <SelectedPath paddingX={1} />
          <FormatCode />
        </Stack>

        <Editor className="flex-1 border-0 border-t border-b border-solid border-gray-300" />
        <BuildInfo className="h-8" />
      </Stack>

      <DividerBox
        mode="vertical"
        className="w-2/5 border-0 border-l border-solid border-gray-300"
      >
        <Stack>
          <Stack direction={"row"} className="overflow-scroll">
            <RequestPreviewerFullScreen />
            <ReloadPreviewer />
          </Stack>
          <Previewer className="overflow-auto flex-1 border-0 border-b border-t border-solid border-gray-200" />
        </Stack>

        <Previewer.Console className="border-0 border-t border-solid border-gray-300 min-h-24 h-24" />
      </DividerBox>
    </DividerBox>
  );
};
