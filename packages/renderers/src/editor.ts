import * as monaco from "monaco-editor";
import { Logger } from "@simple-playground-web/logger";
import { ReplaySubject } from "rxjs";
import { merge, mergeWith, uniqueId } from "lodash-es";

export class Editor {
  #logger = new Logger("Editor");
  #codeEditor: monaco.editor.IStandaloneCodeEditor;
  contentChange$ = new ReplaySubject<[string | undefined, string]>();

  readonly id = uniqueId();
  #lastAbsolutePath?: string;
  #dom = document.createElement("div");
  #container?: HTMLElement;

  constructor() {
    this.#dom.style.height = "100%";
    this.#codeEditor = monaco.editor.create(
      this.#dom,
      merge({
        fontSize: 14,
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
      })
    );

    this.#codeEditor.onDidChangeModelContent(() => {
      this.contentChange$.next([
        this.#codeEditor.getModel()?.uri.fsPath,
        this.#codeEditor.getValue(),
      ]);
    });
  }

  render = (container: HTMLElement) => {
    container.append(this.#dom);
    this.#container = container;

    if (this.#lastAbsolutePath) {
      this.renderPath(this.#lastAbsolutePath);
    }
  };

  /**
   * render content of absolutePath in container
   * @param absolutePath
   */
  renderPath(absolutePath: string) {
    const model = monaco.editor.getModel(monaco.Uri.parse(absolutePath));
    this.#logger.log("render path", absolutePath);
    this.#logger.log("model", model);

    if (model && this.#codeEditor.getModel() !== model) {
      this.#logger.log("set model", model);
      this.#codeEditor.setModel(model);
    }

    this.#lastAbsolutePath = absolutePath;
  }

  remove() {
    this.#dom.remove();
  }

  dispose() {
    this.#codeEditor?.dispose();
  }

  layout() {
    this.#codeEditor.layout();
    if (this.#container) {
      this.#dom.remove();
      requestIdleCallback(
        () => {
          this.render(this.#container!);
        },
        { timeout: 1000 }
      );
    }
  }

  getValue() {
    return this.#codeEditor.getValue() ?? "";
  }

  setValue(value: string) {
    if (this.#codeEditor.getValue() !== value) {
      this.#codeEditor.setValue(value);
    }
  }
}
