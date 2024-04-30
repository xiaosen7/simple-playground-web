import { IImportMap } from "@simple-playground-web/types";

export function appendScript(
  code: string,
  type = "",
  container: HTMLElement = document.body
) {
  const script = document.createElement("script");
  if (type) {
    script.setAttribute("type", type);
  }
  script.innerHTML = code;
  container.append(script);
  return script;
}

export function appendScriptSrc(
  src: string,
  type = "",
  container: HTMLElement = document.body
) {
  const script = document.createElement("script");
  if (type) {
    script.setAttribute("type", type);
  }
  script.src = src;
  container.append(script);
  return script;
}

export function appendStylesheet(css: string, container = document.body) {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = css;
  container.append(style);
  return style;
}

export function appendImportmap(
  importmap: IImportMap,
  container: HTMLElement = document.body
) {
  appendScript(JSON.stringify(importmap, null, 2), "importmap", container);
}

export function createNode(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.childNodes[0];
}
