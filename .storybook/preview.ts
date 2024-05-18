import type { Preview } from "@storybook/react";
import "./tailwind.css";
import process from "process/browser";
import { Buffer } from "buffer";
import { bundler, project } from "@simple-playground-web/core";

window.process = process;
window.Buffer = Buffer;

fetch("/template.json")
  .then((res) => res.json())
  .then((template) => {
    project.setTemplate(template);
  });

bundler.setWasmUrl("/esbuild.wasm");

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
