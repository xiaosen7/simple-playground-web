import * as React from "react";
import { Editor } from "./editor";
import { Meta } from "@storybook/react";
import { PlaygroundProvider, PlaygroundProviderBuilder } from "../provider";
import { Playground } from "@simple-playground-web/playground";
import { Paper, Stack } from "@mui/material";

export default {
  component: Editor,
  decorators: [
    (Story) => (
      <PlaygroundProviderBuilder cwd="/src/playgrounds/styled">
        <Story />
      </PlaygroundProviderBuilder>
    ),
  ],
} satisfies Meta<typeof Editor>;

export const Base = () => <Editor className="h-96" />;
