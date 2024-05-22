import * as esbuild from "esbuild-wasm";

import { initializeFileSystem, resetFileSystem } from "./fs";
import {
  IPluginGlobalsOptions,
  aliasPlugin,
  dataURlPlugin,
  pluginGlobals,
} from "./plugins";
import { IFileObject, ISafeAny } from "@simple-playground-web/types";
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
  #esbuildWasmUrl?: string;
  #globalExternals: Record<string, any> = {};
  #logger = new Logger("Bundler");

  constructor() {}

  setWasmUrl = (esbuildWasmUrl: string) => {
    if (this.#esbuildWasmUrl) {
      console.warn(
        "You should not set esbuild.wasm url twice, because it will only load once."
      );
    }

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
        "You must set esbuild wasm url by method setWasmUrl(esbuildWasmUrl: string)"
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
      bundle: true,
      plugins: [
        pluginGlobals(globals),
        dataURlPlugin(input),
        aliasPlugin({
          ...options.alias,
        }),
        // pluginNodeModules(input),
        ...(options.esbuildOptions?.plugins ?? []),
      ],
      outdir: "dist",
      ...omit(options.esbuildOptions, "plugins"),
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
function singleAsyncFn<T extends (...args: ISafeAny) => Promise<ISafeAny>>(
  originalFn: T
) {
  let last = Promise.resolve();

  return ((...args: ISafeAny) => {
    last = last.catch(() => {}).then(() => originalFn(...args));

    return last;
  }) as T;
}
