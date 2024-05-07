import * as monaco from "monaco-editor";
import { Logger } from "@simple-playground-web/logger";
import {
  ICreateFilterPatternOptions,
  createFilterPattern,
} from "@simple-playground-web/path";

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

  constructor() {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      defaultCompilerOptions
    );
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [2307], // module not found
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

  writeFile(filePath: string, content: string) {
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
    const path = decodeURIComponent(monaco.Uri.file(filePath).toString());
    monaco.languages.typescript.typescriptDefaults.addExtraLib(content, path);

    this.#logger.log("writeDts", path);
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
    }

    this.#logger.log("writeSource", uri);
    return model.getValue();
  }

  getSource(filePath: string) {
    const uri = monaco.Uri.file(filePath);
    let model = monaco.editor.getModel(uri);
    this.#logger.log("getSource", { uri, model, filePath });
    return model?.getValue() ?? "";
  }

  getSourcesFromPattern(
    pattern: string | string[],
    options?: ICreateFilterPatternOptions
  ) {
    const filterPattern = createFilterPattern(pattern, options);
    return this.filterSources(filterPattern);
  }

  filterSources(filter: (filePath: string) => boolean) {
    const models = monaco.editor.getModels();
    return models.reduce((ret, model) => {
      if (filter(model.uri.path)) {
        ret[model.uri.path] = model.getValue();
      }
      return ret;
    }, {} as Record<string, string>);
  }

  delete(filePath: string) {
    const path = monaco.Uri.file(filePath);
    const model = monaco.editor.getModel(path);
    if (model) {
      model.dispose();
      return true;
    }

    return false;
  }

  dispose() {
    monaco.editor.getModels().forEach((x) => x.dispose());
  }
}

export const project = new Project();
