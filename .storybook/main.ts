import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "tailwindcss";
import { mergeConfig } from "vitest/config";
import tailwindConfig from "./tailwind.config";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [tailwindcss({ config: tailwindConfig })],
        },
      },
    });
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
