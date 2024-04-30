import * as monaco from "monaco-editor";
import { Logger } from "@simple-playground-web/logger";
import { Subject } from "rxjs";

export enum ETheme {
  dark = "vs-dark",
  light = "vs",
}

export class Editor {
  #codeEditor: monaco.editor.IStandaloneCodeEditor;
  #dom: HTMLDivElement;
  #logger = new Logger("Editor");
  contentChange$ = new Subject<void>();

  static ETheme = ETheme;
  static setTheme(theme: ETheme) {
    monaco.editor.setTheme(theme);
  }

  constructor() {
    this.#dom = document.createElement("div");
    this.#dom.style.height = "100%";
    this.#codeEditor = monaco.editor.create(this.#dom, {
      fontSize: 14,
      automaticLayout: true,
    });

    this.#codeEditor.onDidChangeModelContent(() => {
      this.contentChange$.next();
    });
  }

  render(container: HTMLElement) {
    container.append(this.#dom);
  }

  renderPath(absolutePath: string) {
    const model = monaco.editor.getModel(monaco.Uri.parse(absolutePath));
    this.#logger.log("renderSource", { filePath: absolutePath, model });
    this.#codeEditor.setModel(model);
  }

  dispose() {
    this.#codeEditor.dispose();
  }
}
