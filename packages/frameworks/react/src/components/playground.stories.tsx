import {
  Badge,
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { PlaygroundProviderBuilder } from "../provider";
import { Playground } from "./playground";
import React from "react";
import { Explore } from "./explore";
import { Editor } from "./editor";
import { Previewer } from "./previewer";
import { BuildInfo } from "./build-info";
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
import { range } from "lodash-es";
import DockLayout, { DividerBox } from "rc-dock";
import { SelectedPath } from "./selected-path";

export default {
  component: Playground,
};

export const Base = () => (
  <Playground
    style={{ height: "calc(100vh - 40px)" }}
    cwd="/src/playgrounds/xstate"
  />
);

export const CustomLayout = () => {
  return (
    <PlaygroundProviderBuilder cwd="/src/playgrounds/xstate" entry="index.tsx">
      <DividerBox
        mode="vertical"
        className={"border border-solid border-gray-300"}
        style={{ height: "calc(100vh - 20px)" }}
      >
        {/* explore part */}
        <div className="flex flex-col ">
          <Stack direction={"row"} className="overflow-scroll">
            <Rename />
            <CreateFile />
            <CreateFolder />
            <Delete />
            <Undo />
            <Redo />
          </Stack>
          <Explore className="border-0 border-t border-solid border-gray-300 h-20" />
        </div>

        {/* editor part */}
        <DividerBox
          mode="vertical"
          className="border-0 border-b border-t border-solid border-gray-300 "
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            paddingX={1}
            justifyContent={"space-between"}
          >
            <SelectedPath />
            <FormatCode />
          </Stack>

          <Editor className="flex-1 border-0 border-t border-b border-solid border-gray-300" />
          <BuildInfo className="min-h-8" />
        </DividerBox>

        {/* preview part */}
        <DividerBox mode="vertical">
          <Stack>
            <Stack direction={"row"} className="overflow-scroll">
              <RequestPreviewerFullScreen />
              <ReloadPreviewer />
            </Stack>
            <Previewer className="overflow-auto flex-1 border-0 border-b border-t border-solid border-gray-200" />
          </Stack>

          <Previewer.Console className="border-0 border-t border-solid border-gray-300 h-24" />
        </DividerBox>
      </DividerBox>
    </PlaygroundProviderBuilder>
  );
};

export const Multiple = () => {
  return (
    <Grid container spacing={2}>
      {["hello-world", "mui", "styled", "xstate"].map((name) => {
        return (
          <Grid height={"50vh"} key={name} item xs={6}>
            <Playground
              className="h-full"
              cwd={`/src/playgrounds/${name}`}
              entry="index.tsx"
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
