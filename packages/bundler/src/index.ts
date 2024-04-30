"use client";
import * as esbuild from "esbuild-wasm";

import { initializeFileSystem, resetFileSystem } from "./fs";
import { IPluginGlobalsOptions, pluginGlobals } from "./plugins";
import { IFileObject, ISafeAny } from "@simple-playground-web/types";
import { once } from "lodash-es";

interface IBuildOptions {
  input: IFileObject[] | Record<string, string>;
  entry: string;
  external?: string[];
  globalExternals?: IPluginGlobalsOptions;
}

export class Bundler {
  constructor(private readonly esbuildWasmUrl: string) {}

  #init = once(async () => {
    initializeFileSystem();
    await esbuild.initialize({
      worker: false,
      wasmURL: this.esbuildWasmUrl,
    });
    console.log("Esbuild initialized.");
  });

  build = singleExecutionPromiseWrapper(async (options: IBuildOptions) => {
    await this.#init();

    const { input, external = [], entry } = options;
    const pathToContent = Array.isArray(input)
      ? input.reduce((memo, { path, content }) => {
          memo[path] = content;
          return memo;
        }, {} as Record<string, string>)
      : input;
    resetFileSystem(pathToContent);

    const result = await esbuild.build({
      entryPoints: [entry],
      bundle: true,
      plugins: [pluginGlobals(options.globalExternals)],
      external: external,
      outdir: "dist",
    });

    const jsResult = result.outputFiles?.find((x) => x.path.endsWith(".js"));
    const cssResult = result.outputFiles?.find((x) => x.path.endsWith(".css"));

    return { js: jsResult?.text, css: cssResult?.text };
  });
}

/**
 * @reference https://www.npmjs.com/package/esbuild-plugin-alias
 * @param options
 * @returns
 */
// function aliasPlugin(options: Record<string, string>): esbuild.Plugin {
//   const aliases = Object.keys(options);
//   const re = new RegExp(`^(${aliases.map((x) => escapeRegExp(x)).join('|')})`);

//   return {
//     name: aliasPlugin.name,
//     setup(build) {
//       // we do not register 'file' namespace here, because the root file won't be processed
//       // https://github.com/evanw/esbuild/issues/791
//       build.onResolve({ filter: re }, async (args) => {
//         const from = args.path.match(re)![0];
//         const to = options[from];
//         const replaced = args.path.replace(from, to);
//         const result = await build.resolve(replaced.startsWith('/') ? replaced : `/${replaced}`, {
//           kind: 'import-statement',
//           resolveDir: '.'
//         });

//         return {
//           path: result.path
//         };
//       });
//     }
//   };
// }

// function escapeRegExp(string: string) {
//   // $& means the whole matched string
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

// function dataURlPlugin(pathToContent: Record<string, string>): esbuild.Plugin {
//   return {
//     name: dataURlPlugin.name,
//     setup(build) {
//       // build.onResolve({ filter: /\.(jpe?g|png|gif|bmp|svg)$/, namespace: 'dataURLPlugin' }, (args) => {
//       //   console.log({ args });
//       //   return {
//       //     namespace: 'dataURLPlugin',
//       //     path: args.path,
//       //     external: true
//       //   };
//       // });

//       build.onLoad({ filter: /\.(jpe?g|png|gif|bmp|svg)$/ }, (args) => {
//         const ext = args.path.split('.').pop();
//         let type: string;
//         switch (ext) {
//           case 'png':
//             type = 'image/png';
//             break;

//           case 'svg':
//             type = 'image/svg+xml';
//             break;

//           case 'gif':
//             type = 'image/gif';
//             break;

//           case 'bmp':
//             type = 'image/bmp';
//             break;

//           case 'jpeg':
//           case 'jpg':
//             type = 'image/jpeg';
//             break;

//           default:
//             throw new Error(`Can't get mime type of ${args.path}`);
//         }

//         console.log({ path: args.path, pathToContent });
//         const content = pathToContent[args.path];
//         const contents = `export default 'data:${type};base64,${content}'`;
//         console.log(contents.substring(0, 10));
//         return {
//           contents
//         };
//       });
//     }
//   };
// }

/**
 * 同一时间内，函数只会被执行一次，多次调用排队执行
 */
function singleExecutionPromiseWrapper<
  T extends (...args: ISafeAny) => Promise<ISafeAny>
>(originalFn: T) {
  let last = Promise.resolve();

  return ((...args: ISafeAny) => {
    last = last.catch(() => {}).then(() => originalFn(...args));

    return last;
  }) as T;
}

const fn = singleExecutionPromiseWrapper(async (x: number) => 1);
