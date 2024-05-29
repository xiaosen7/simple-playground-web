import * as esbuild from "esbuild-wasm";

import { initializeFileSystem, resetFileSystem } from "./fs";
import {
  IPluginGlobalsOptions,
  aliasPlugin,
  dataURlPlugin,
  pluginGlobals,
} from "./plugins";
import { memoize, omit, once } from "lodash-es";
import { AsyncReturnType } from "type-fest";
import { Logger } from "@simple-playground-web/logger";

const loadEsbuildWasm = once(async (wasmURL: string) => {
  initializeFileSystem();
  await esbuild.initialize({
    wasmURL,
    worker: false,
  });
});

export interface IBuildOptions {
  input: Record<string, string>;
  entry: string;
  globalExternals?: IPluginGlobalsOptions;
  alias?: Record<string, string>;
  esbuildOptions?: Parameters<typeof esbuild.build>[0];
}

class Bundler {
  #esbuildWasmUrl: string =
    "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.2/esbuild.wasm";
  #globalExternals: Record<string, any> = {};
  #logger = new Logger("Bundler");

  constructor() {}

  /**
   * You can set the esbuild wasm url manually, if you don't want to use the default one: "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.2/esbuild.wasm"
   * @param esbuildWasmUrl
   */
  setWasmUrl = (esbuildWasmUrl: string) => {
    this.#esbuildWasmUrl = esbuildWasmUrl;
  };

  /**
   * @example
   *
   * import * as React from "react";
   * import * as ReactDOM from "react-dom";
   * import * as antd from "antd"
   *
   * bundler.setGlobalExternals({
   *  react: React,
   * "react-dom": ReactDOM
   * });
   *
   *
   * // this will merge with previous globalExternals
   * bundler.setGlobalExternals({
   *  antd
   * });
   *
   * @param name
   * @param value
   */
  setGlobalExternals(globalExternals: Record<string, any>) {
    this.#globalExternals = {
      ...this.#globalExternals,
      ...globalExternals,
    };
  }

  getGlobalExternals() {
    return {
      ...this.#globalExternals,
    };
  }

  load = once(async () => {
    if (!this.#esbuildWasmUrl) {
      throw new Error(
        "You must set esbuild wasm url by method bundler.setWasmUrl(esbuildWasmUrl: string)"
      );
    }

    await loadEsbuildWasm(this.#esbuildWasmUrl);
  });

  build = singleAsyncFn(
    async (options: IBuildOptions): Promise<IBuildResult> => {
      try {
        const result = await this.#build(options);
        return {
          ...result,
          buildError: undefined,
        };
      } catch (buildError) {
        return {
          css: "",
          errors: [],
          hash: "",
          js: "",
          buildError: buildError as Error,
          globalExternals: {},
        };
      }
    }
  );

  async #build(options: IBuildOptions) {
    await this.load();

    const { input, entry } = options;
    resetFileSystem(input);

    const globals = Object.keys({
      ...this.#globalExternals,
      ...options.globalExternals,
    }).reduce(
      (globals, key) => {
        globals[key] = `__globals["${key}"]`;
        return globals;
      },
      {} as Record<string, string>
    );

    const result = await esbuild.build({
      entryPoints: [entry],
      sourcemap: "inline",
      bundle: true,
      plugins: [
        pluginGlobals(globals),
        dataURlPlugin(input),
        aliasPlugin({
          ...options.alias,
        }),
        // pluginTransform(input),
        // pluginNodeModules(input),
        ...(options.esbuildOptions?.plugins ?? []),
      ],
      outdir: "dist",
      ...omit(options.esbuildOptions, "plugins"),
      loader: {
        ".js": "js",
        ".json": "json",
        ".css": "css",
        ".jsx": "jsx",
        ".ts": "ts",
        ".tsx": "tsx",
        ".text": "text",
        ".jpg": "base64",
        ".webp": "file",
        ".svg": "dataurl",
        ".ttf": "dataurl",
        ".eot": "dataurl",
        ".woff": "dataurl",
        ".woff2": "dataurl",
        ".png": "dataurl",
        ...options.esbuildOptions?.loader,
      },
    });

    const jsResult = result.outputFiles?.find((x) => x.path.endsWith(".js"));
    const cssResult = result.outputFiles?.find((x) => x.path.endsWith(".css"));
    const hash =
      result.outputFiles?.map((x) => `${x.path}-${x.hash}`).join(",") ?? "";

    return {
      js: jsResult?.text ?? "",
      css: cssResult?.text ?? "",
      hash,
      errors: result.errors,
      globalExternals: {
        __globals: {
          ...this.#globalExternals,
          ...options.globalExternals,
        },
      },
    };
  }
}

export const bundler = new Bundler();

export type IBuildResult = {
  buildError?: Error;
  js: string;
  css: string;
  hash: string;
  errors: esbuild.Message[];
  globalExternals?: Record<string, any>;
};

/**
 * 同一时间内，函数只会被执行一次，多次调用排队执行
 */
function singleAsyncFn<T extends (...args: any) => Promise<any>>(
  originalFn: T
) {
  let last = Promise.resolve();

  return ((...args: any) => {
    last = last.catch(() => {}).then(() => originalFn(...args));

    return last;
  }) as T;
}
