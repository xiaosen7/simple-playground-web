import * as monaco from "monaco-editor";
import { Logger } from "@simple-playground-web/logger";
import { ReplaySubject } from "rxjs";

export enum ETheme {
  dark = "vs-dark",
  light = "vs",
}

export class Editor {
  #codeEditor: monaco.editor.IStandaloneCodeEditor;
  #dom: HTMLDivElement;
  #logger = new Logger("Editor");
  contentChange$ = new ReplaySubject<void>();

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

  /**
   * render content of absolutePath in container
   * @param absolutePath
   */
  renderPath(absolutePath: string) {
    const model = monaco.editor.getModel(monaco.Uri.parse(absolutePath));

    if (model && this.#codeEditor.getModel() !== model) {
      this.#codeEditor.setModel(model);
      this.#logger.log("codeEditor.setModel", { absolutePath, model });
    }
  }

  dispose() {
    this.#codeEditor.dispose();
  }
}
