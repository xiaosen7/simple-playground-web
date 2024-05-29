import {
  Autocomplete,
  Badge,
  Box,
  Divider,
  Grid,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PlaygroundProviderBuilder } from "../provider";
import { Playground } from "./playground";
import React, { useState } from "react";
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
import { basename } from "@simple-playground-web/path";
import { take } from "rxjs";

export default {
  component: Playground,
};

export const Base = () => {
  const [cwd, setCwd] = useState("/src/playgrounds/hello-world");
  return (
    <>
      <Autocomplete
        style={{ margin: "8px", minWidth: "150px" }}
        size="small"
        renderInput={(params) => <TextField {...params} label="Playground" />}
        onChange={(_, cwd) => cwd && setCwd(cwd)}
        value={cwd}
        getOptionLabel={(cwd) => basename(cwd)}
        options={[
          "/src/playgrounds/hello-world",
          "/src/playgrounds/mui",
          "/src/playgrounds/antd",
          "/src/playgrounds/xstate",
          "/src/playgrounds/lodash-es",
          "/src/playgrounds/styled",
        ]}
      />

      <Playground style={{ height: "90vh" }} cwd={cwd} />
    </>
  );
};

export const CustomLayout = () => {
  return (
    <PlaygroundProviderBuilder cwd="/src/playgrounds/hello-world">
      <div className="h-[90vh] flex border border-gray-200 border-solid">
        <Editor className="w-1/2" />
        <Previewer className="w-1/2" />
      </div>
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
