import * as monaco from "monaco-editor";
import { Logger } from "@simple-playground-web/logger";
import { basename, createFilterPattern } from "@simple-playground-web/path";
import { ReplaySubject } from "rxjs";
import * as fs from "@simple-playground-web/fs";
import { IProjectTemplate } from "./template";

const { EFsEventType, FS } = fs;

export * from "./template";

const defaultCompilerOptions: monaco.languages.typescript.CompilerOptions = {
  target: monaco.languages.typescript.ScriptTarget.ESNext,
  allowNonTsExtensions: true,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  module: monaco.languages.typescript.ModuleKind.ESNext,
  noEmit: true,
  jsx: monaco.languages.typescript.JsxEmit.React,
  allowSyntheticDefaultImports: true,
  strict: true,
  skipLibCheck: true,
  baseUrl: decodeURIComponent(monaco.Uri.parse(".").toString()),
};

/**
 * 因为 monaco-editor 的 typescript 只能设置一次，并且文件很多的话写入会影响一定性能，所以这里使用单例模式
 */
class Project {
  #logger = new Logger("project");
  monaco = monaco;
  newFile$ = new ReplaySubject<string>();
  fs = new FS();
  template: IProjectTemplate = {
    files: { "index.ts": `console.log("Hello world")` },
    externals: { cjsCode: "module.exports = {  }" },
  };

  constructor() {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      defaultCompilerOptions
    );
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [2307], // module not found
    });

    this.fs.watch("/", (event, filename) => {
      this.#logger.log("fs event", event, filename);
      this.#logger.log("fs data", this.fs.data);
      switch (event) {
        case EFsEventType.Change:
          if (
            this.fs.existsSync(filename) &&
            this.fs.statSync(filename).isFile()
          ) {
            const uri = monaco.Uri.file(filename);
            const model = monaco.editor.getModel(uri);
            const value = model?.getValue();
            const newValue = this.fs.readFileSync(filename, "utf8");

            if (value !== newValue) {
              this.#writeFile(filename, newValue);
            }
          }
          break;
        case EFsEventType.Unlink:
          const uri = monaco.Uri.file(filename);
          const model = monaco.editor.getModel(uri);
          model?.dispose();
          break;
        default:
          break;
      }
    });
  }

  /**
   * 设置编译选项
   * @param options
   */
  setCompilerOptions(options: monaco.languages.typescript.CompilerOptions) {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      ...defaultCompilerOptions,
      ...options,
    });
  }

  #writeFile(filePath: string, content: string) {
    if (filePath.endsWith(".d.ts")) {
      this.#writeDts(filePath, content);
    } else {
      this.#writeSource(filePath, content);
    }
  }

  /**
   * 写入类型声明文件 *.d.ts 文件
   * @param filePath
   * @param content
   * @returns
   */
  #writeDts(filePath: string, content: string) {
    const uri = monaco.Uri.file(filePath);
    const path = decodeURIComponent(uri.toString());
    monaco.languages.typescript.typescriptDefaults.addExtraLib(content, path);

    let model = monaco.editor.getModel(uri);
    if (!model) {
      this.newFile$.next(filePath);
    }
  }

  /**
   * 写入源代码 *.ts/js/css ...
   * @param filePath
   * @param content
   */
  #writeSource(filePath: string, content: string) {
    const uri = monaco.Uri.file(filePath);
    let model = monaco.editor.getModel(uri);

    if (model) {
      model.setValue(content);
    } else {
      model = monaco.editor.createModel(content, undefined, uri);
      this.newFile$.next(filePath);
    }

    return model.getValue();
  }

  setTemplate(template: IProjectTemplate) {
    this.#logger.time("setTemplate");
    // this.fs.rmdirSync("/");
    this.template = template;
    Object.entries(template.files).forEach(([name, code]) => {
      this.fs.writeFileSync(name, code);
      this.#logger.log("write file", name);
    });
    this.#logger.timeEnd("setTemplate");
  }
}

export const project = new Project();
