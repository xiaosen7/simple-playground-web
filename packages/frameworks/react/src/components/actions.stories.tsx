import React from "react";
import {
  Action,
  Delete,
  FormatCode,
  CreateFile,
  CreateFolder,
  ReloadPreviewer,
  Rename,
  RequestPreviewerFullScreen,
  Redo,
  Undo,
  Download,
} from "./actions";
import { PlaygroundProviderBuilder } from "../provider";
import { Stack } from "@mui/material";

export default {
  component: Action,
  decorators: [
    (Story: () => JSX.Element) => (
      <PlaygroundProviderBuilder cwd="/src/playgrounds/xstate">
        <Story />
      </PlaygroundProviderBuilder>
    ),
  ],
};

export const Base = () => (
  <Stack direction={"row"}>
    <ReloadPreviewer />
    <RequestPreviewerFullScreen />
    <FormatCode />
    <Rename />
    <CreateFolder />
    <CreateFile />
    <Delete />
    <Undo />
    <Redo />
    <Download />
  </Stack>
);
