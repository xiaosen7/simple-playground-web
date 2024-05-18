import * as React from "react";
import { Previewer } from "./previewer";
import { Meta } from "@storybook/react";
import { PlaygroundProviderBuilder } from "../provider";
import { Paper, Stack } from "@mui/material";

export default {
  component: Previewer,
  decorators: [
    (Story) => (
      <PlaygroundProviderBuilder cwd="/src/playgrounds/1">
        <Story />
      </PlaygroundProviderBuilder>
    ),
  ],
} satisfies Meta<typeof Previewer>;

export const Base = () => <Previewer />;
