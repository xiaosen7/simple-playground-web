import React from "react";
import { ExploreMenu, PreviewerMenu } from "./menus";
import { PlaygroundProviderBuilder } from "../provider";
import { Stack } from "@mui/material";

export default {
  component: () => null,
  decorators: [
    (Story: () => JSX.Element) => (
      <PlaygroundProviderBuilder cwd="/src/playgrounds/xstate">
        <Story />
      </PlaygroundProviderBuilder>
    ),
  ],
};

export const Base = () => (
  <Stack direction={"row"} spacing={2}>
    <div>
      Explore Menu
      <ExploreMenu />
    </div>

    <div>
      Previewer Menu
      <PreviewerMenu />
    </div>
  </Stack>
);
