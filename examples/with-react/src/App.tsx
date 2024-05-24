import { bundler, project, Logger } from "@simple-playground-web/core";
import * as core from "@simple-playground-web/core";
import { Playground } from "@simple-playground-web/react";
import * as react from "@simple-playground-web/react";
import "@simple-playground-web/react/dist/esm/index.css";

Logger.setConfig({
  log: false,
});

fetch("/template.json")
  .then((r) => r.json())
  .then((template) => project.setTemplate(template));

bundler.setWasmUrl(
  "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.2/esbuild.wasm"
);

export default function App() {
  return (
    <Playground
      globalExternals={{
        process,
      }}
      style={{ height: "100vh" }}
      cwd="/src/playgrounds/playground"
    />
  );
}
