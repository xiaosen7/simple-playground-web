import { bundler, project, Logger } from "@simple-playground-web/core";
import { Playground } from "@simple-playground-web/react";
import "@simple-playground-web/react/dist/esm/index.css";

Logger.setConfig({
  log: false,
});

project.setTemplate({
  files: {
    "/index.ts": "console.log('Hello World!');",
  },
  externals: {
    cjsCode: "",
  },
});

bundler.setWasmUrl(
  "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.2/esbuild.wasm"
);

export default function App() {
  return <Playground style={{ height: "100vh" }} cwd="/" />;
}
