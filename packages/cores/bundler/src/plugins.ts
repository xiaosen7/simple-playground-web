import * as esbuild from "esbuild-wasm";
import { dirname } from "@simple-playground-web/path";

type GlobalResolveFunc = (moduleName: string) => string | undefined;

export type IPluginGlobalsOptions = {
  [key: string]: string | GlobalResolveFunc;
};

const generateResolveFilter = (moduleNames: string[]): RegExp => {
  return new RegExp(`^(${moduleNames.join("|")})$`);
};

const generateExport = (globals: IPluginGlobalsOptions, name: string) => {
  const match = Object.entries(globals).find(([pattern]) => {
    return new RegExp(`^${pattern}$`).test(name);
  });

  if (match) {
    const output = typeof match[1] === "function" ? match[1](name) : match[1];

    return output ? `module.exports = ${output}` : undefined;
  }
};

function escapeRegExp(string: string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * @reference https://www.npmjs.com/package/esbuild-plugin-alias
 * @param options
 * @returns
 */
export function aliasPlugin(options: Record<string, string>): esbuild.Plugin {
  const aliases = Object.keys(options);
  const re = new RegExp(`^(${aliases.map((x) => escapeRegExp(x)).join("|")})`);

  return {
    name: aliasPlugin.name,
    setup(build) {
      // we do not register 'file' namespace here, because the root file won't be processed
      // https://github.com/evanw/esbuild/issues/791
      build.onResolve({ filter: re }, async (args) => {
        const from = args.path.match(re)![0];
        const to = options[from];
        if (!to) {
          return;
        }

        const replaced = args.path.replace(from, to);
        const result = await build.resolve(
          replaced.startsWith("/") ? replaced : `/${replaced}`,
          {
            kind: "import-statement",
            resolveDir: ".",
          }
        );

        return {
          path: result.path,
        };
      });
    },
  };
}

export function dataURlPlugin(
  pathToContent: Record<string, string>
): esbuild.Plugin {
  return {
    name: dataURlPlugin.name,
    setup(build) {
      build.onLoad({ filter: /\.(jpe?g|png|gif|bmp|svg)$/ }, (args) => {
        const ext = args.path.split(".").pop();
        let type: string;
        switch (ext) {
          case "png":
            type = "image/png";
            break;

          case "svg":
            type = "image/svg+xml";
            break;

          case "gif":
            type = "image/gif";
            break;

          case "bmp":
            type = "image/bmp";
            break;

          case "jpeg":
          case "jpg":
            type = "image/jpeg";
            break;

          default:
            throw new Error(`Can't get mime type of ${args.path}`);
        }

        const content = pathToContent[args.path];
        const contents = `export default 'data:${type};base64,${content}'`;
        return {
          contents,
        };
      });
    },
  };
}

export const pluginGlobals = (
  globals: IPluginGlobalsOptions = {}
): esbuild.Plugin => {
  const filter = generateResolveFilter(Object.keys(globals));

  return {
    name: "globals",
    setup(build) {
      build.onResolve({ filter: /^@?[a-zA-Z]/ }, (args) => {
        return { path: args.path, namespace: "globals" };
      });

      build.onLoad({ filter: /.*/, namespace: "globals" }, (args) => {
        const name = args.path;
        const contents = generateExport(globals, name);

        if (contents) {
          return { contents };
        } else {
          return { contents: `module.exports = window.require("${name}")` };
        }
      });
    },
  };
};

// export const pluginNodeModules = (
//   input: Record<string, string>
// ): esbuild.Plugin => {
//   const filter = generateResolveFilter([
//     "react",
//     "react-dom/client",
//     "xstate",
//     "@xstate/react",
//   ]);
//   debugger;
//   return {
//     name: "globals",
//     setup(build) {
//       build.onResolve(
//         {
//           filter,
//         },
//         (args) => {
//           return { path: args.path, namespace: "node-modules" };
//         }
//       );

//       build.onLoad({ filter: /.*/, namespace: "node-modules" }, (args) => {
//         debugger;
//         const name = args.path;
//         return {
//           contents: `import modules from "/node_modules/global-modules.js";
// module.exports = modules["${name}"]`,
//           resolveDir: "/",
//         };

//         return null;
//       });
//     },
//   };
// };
