import { Buffer } from "buffer";
import { bundler, project } from "@simple-playground-web/core";
import { Playground } from "@simple-playground-web/react";
import "@simple-playground-web/react/dist/index.css";

window.process = process;
window.Buffer = Buffer;

fetch("/template.json")
  .then((r) => r.json())
  .then((template) => project.setTemplate(template));

bundler.setWasmUrl(
  "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.2/esbuild.wasm"
);

export default function App() {
  return <Playground style={{ height: "100vh" }} cwd="/" />;
}
