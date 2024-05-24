import type { Preview } from "@storybook/react";
import "./tailwind.css";
import { bundler, project } from "@simple-playground-web/core";

fetch("./template.json")
  .then((res) => res.json())
  .then((template) => {
    project.setTemplate(template);
  });

bundler.setWasmUrl("./esbuild.wasm");

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
