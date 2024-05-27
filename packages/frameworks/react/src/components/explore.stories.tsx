import { Explore } from "./explore";
import * as React from "react";
import { range } from "lodash-es";
import { Meta } from "@storybook/react";

import { Playground } from "@simple-playground-web/playground";
import { PlaygroundProvider, PlaygroundProviderBuilder } from "../provider";

export default {
  component: Explore,
  decorators: [
    (Story) => (
      <PlaygroundProviderBuilder cwd="/src/playgrounds/xstate">
        <Story />
      </PlaygroundProviderBuilder>
    ),
  ],
} satisfies Meta;

export const Base = () => <Explore className="w-[200px] h-[500px]" />;
export const Overflow = () => <Explore className="w-[200px] h-[50px]" />;
