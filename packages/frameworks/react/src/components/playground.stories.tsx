import { Box, Grid, Paper, Stack } from "@mui/material";
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

export default {
  component: Playground,
};

export const Base = () => (
  <Playground
    style={{ height: "calc(100vh - 40px)" }}
    cwd="/src/playgrounds/1"
  />
);

export const CustomLayout = () => {
  return (
    <PlaygroundProviderBuilder cwd="/src/playgrounds/1" entry="index.tsx">
      <Stack style={{ height: "calc(100vh - 40px)" }} spacing={2}>
        <Paper>
          <Stack direction={"row"}>
            <Rename />
            <CreateFile />
            <CreateFolder />
            <Delete />
            <Undo />
            <Redo />
          </Stack>
          <Explore style={{ height: 200 }} />
        </Paper>
        <Paper>
          <Stack direction={"row"}>
            <FormatCode />
          </Stack>
          <Editor style={{ height: 200 }} />
          <BuildInfo />
        </Paper>
        <Paper>
          <Stack direction={"row"}>
            <ReloadPreviewer />
            <RequestPreviewerFullScreen />
          </Stack>

          <Previewer style={{ height: 200 }} />
        </Paper>
      </Stack>
    </PlaygroundProviderBuilder>
  );
};

export const Multiple = () => {
  return (
    <Grid container spacing={2}>
      {range(4).map((index) => {
        const name = index + 1;
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
