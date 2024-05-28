import React from "react";

import { PlaygroundProviderBuilder } from "../provider";
import { Stack } from "@mui/material";
import { SourceIcon } from "./source-icon";

export default {
  component: SourceIcon,
  decorators: [
    (Story: () => JSX.Element) => (
      <PlaygroundProviderBuilder cwd="/src/playgrounds/xstate">
        <Story />
      </PlaygroundProviderBuilder>
    ),
  ],
};

const extensions = ["tsx", "ts", "jsx", "js", "css", "less", "json", "unknown"];
export const Base = () => (
  <Stack direction={"row"} spacing={2}>
    {extensions.map((x) => (
      <div key={x}>
        {x}
        <SourceIcon className="align-middle" width={16} extension={x} />
      </div>
    ))}
  </Stack>
);
