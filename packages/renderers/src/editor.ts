import * as monaco from "monaco-editor";
import { Logger } from "@simple-playground-web/logger";
import { ReplaySubject } from "rxjs";
import { mergeWith, uniqueId } from "lodash-es";

export class Editor {
  #logger = new Logger("Editor");
  #codeEditor?: monaco.editor.IStandaloneCodeEditor;
  contentChange$ = new ReplaySubject<[string | undefined, string]>();

  readonly id = uniqueId();
  #lastAbsolutePath?: string;

  constructor() {}

  render = (
    container: HTMLElement,
    options: monaco.editor.IStandaloneEditorConstructionOptions = {}
  ) => {
    if (this.#codeEditor) {
      this.#codeEditor.dispose();
    }

    const codeEditor = monaco.editor.create(
      container,
      mergeWith(
        {
          fontSize: 14,
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        },
        options
      )
    );

    codeEditor.onDidChangeModelContent(() => {
      this.contentChange$.next([
        codeEditor.getModel()?.uri.fsPath,
        codeEditor.getValue(),
      ]);
    });

    this.#codeEditor = codeEditor;

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

    if (model && this.#codeEditor?.getModel() !== model) {
      this.#codeEditor?.setModel(model);
    }

    this.#lastAbsolutePath = absolutePath;
  }

  dispose() {
    this.#codeEditor?.dispose();
  }

  layout() {
    this.#codeEditor?.layout();
  }

  getValue() {
    return this.#codeEditor?.getValue() ?? "";
  }

  setValue(value: string) {
    if (this.#codeEditor?.getValue() !== value) {
      this.#codeEditor?.setValue(value);
    }
  }
}
