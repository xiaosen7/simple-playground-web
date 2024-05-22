import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "tailwindcss";
import { mergeConfig } from "vitest/config";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
import { join } from "path";
import { findWorkspacePackages } from "@pnpm/workspace.find-packages";

const config: StorybookConfig = {
  stories: [
    "./storybook-examples/**/*.mdx",
    "./storybook-examples/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/frameworks/react/src/**/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-storysource",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["./public"],
  viteFinal: async (config) => {
    const tailwindConfig = await getTailwindConfig();
    return mergeConfig(config, {
      plugins: [monacoEditorPlugin({})],
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
  previewBody: (s) =>
    `${s} <script>window.process = {browser: true, env: {}} </script>`,
};
export default config;

async function getTailwindConfig() {
  const content = (await findWorkspacePackages(join(__dirname, ".."))).map(
    (x) => join(`${x.dir}/src/**/*.{js,ts,jsx,tsx}`)
  );

  /** @type {import('tailwindcss').Config} */
  return {
    content,
    theme: {
      extend: {},
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    },
  };
}
