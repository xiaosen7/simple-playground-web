import "./workers";
import { bundler, project, Logger } from "@simple-playground-web/core";
import { Playground } from "@simple-playground-web/react";
import "@simple-playground-web/react/dist/esm/index.css";
import { createRoot } from "react-dom/client";

Logger.setConfig({
  log: false,
});

fetch("/template.json")
  .then((r) => r.json())
  .then((template) => project.setTemplate(template));

createRoot(document.getElementById("root")!).render(
  <Playground style={{ height: "100vh" }} cwd="/mui" />
);
