import * as React from "react";
import { Editor } from "./editor";
import { Meta } from "@storybook/react";
import { PlaygroundProvider, PlaygroundProviderBuilder } from "../provider";
import { Playground } from "@simple-playground-web/playground";
import { Paper, Stack } from "@mui/material";
import { SelectedPath } from "./selected-path";

export default {
  component: SelectedPath,
  decorators: [
    (Story) => (
      <PlaygroundProviderBuilder cwd="/src/playgrounds/xstate">
        <Story />
      </PlaygroundProviderBuilder>
    ),
  ],
} satisfies Meta<typeof SelectedPath>;

export const Base = () => <SelectedPath />;
