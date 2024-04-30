import { ISafeAny } from "@simple-playground-web/types";

type GlobalResolveFunc = (moduleName: string) => string | undefined;

export type IPluginGlobalsOptions = {
  [key: string]: string | GlobalResolveFunc;
};

const generateResolveFilter = (globals: IPluginGlobalsOptions): RegExp => {
  const moduleNames = Object.keys(globals);
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

export const pluginGlobals = (globals: IPluginGlobalsOptions = {}) => {
  const filter = generateResolveFilter(globals);

  return {
    name: "globals",
    setup(build: ISafeAny) {
      build.onResolve({ filter }, (args: ISafeAny) => {
        return { path: args.path, namespace: "globals" };
      });

      build.onLoad({ filter: /.*/, namespace: "globals" }, (args: ISafeAny) => {
        const name = args.path;
        const contents = generateExport(globals, name);

        if (contents) {
          return { contents };
        }

        return null;
      });
    },
  };
};
