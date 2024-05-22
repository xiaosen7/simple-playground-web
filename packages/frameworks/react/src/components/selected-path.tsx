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
import { Paper, Stack, Typography, TypographyProps } from "@mui/material";
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

export const SelectedPath = (props: TypographyProps) => {
  const selectedFilePath = useSelectedPath();

  return selectedFilePath ? (
    <Typography variant="body2" {...props}>
      {selectedFilePath}
    </Typography>
  ) : null;
};

export function useSelectedPath() {
  const playground = usePlayground();
  const selectedFilePath = useObservable(
    playground.selectedPath$.pipe(
      filter((x) => project.fs.statSync(playground.explore.resolve(x)).isFile())
    )
  );
  return selectedFilePath;
}
