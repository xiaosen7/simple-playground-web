import { Buffer } from "buffer";
import { bundler, project } from "@simple-playground-web/core";
import { Playground } from "@simple-playground-web/react";
import "@simple-playground-web/react/dist/index.css";

window.process = process;
window.Buffer = Buffer;

project.setTemplate({
  files: {
    "/index.ts": "console.log('hello world');",
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
