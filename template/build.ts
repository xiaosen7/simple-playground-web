import { build } from "esbuild";
import { resolve } from "import-meta-resolve";

const nodeModules = ["react", "react-dom/client", "@xstate/react", "xstate"];

(async () => {
  await build({
    outdir: "./externals",
    // entryPoints: nodeModules.map((name) => ({
    //   in: resolve(name, import.meta.url).replace("file://", ""),
    //   out: `node_modules/${name}`,
    // })),
    entryPoints: [
      {
        in: "./global-modules.ts",
        out: "cjs",
      },
    ],
    bundle: true,
    format: "cjs",
    minify: false,
  });
})();
