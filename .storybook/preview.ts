import type { Preview } from "@storybook/react";
import "./tailwind.css";
import { bundler, project } from "@simple-playground-web/core";
import * as monacoEditor from "monaco-editor";

fetch("./template.json")
  .then((res) => res.json())
  .then((template) => {
    project.setTemplate(template);
  });

bundler.setWasmUrl("./esbuild.wasm");

bundler.setGlobalExternals({
  "monaco-editor": monacoEditor, // Used in playground: /src/playgrounds/playground
});

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
