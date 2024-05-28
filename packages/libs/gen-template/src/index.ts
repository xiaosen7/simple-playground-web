import { readFile, writeFile, mkdir } from "fs/promises";
import { join, resolve, basename } from "path";
import { DtsRollup } from "@simple-playground-web/dts-rollup";
import fg from "fast-glob";
import { Command } from "commander";
import cpy from "cpy";
import { build } from "esbuild";
import fsx from "fs-extra";

import { Project } from "ts-morph";

process.addListener("unhandledRejection", errorCallback);
process.addListener("uncaughtException", errorCallback);

const DEFAULT_OUT_DIR_NAME = "gen-template-dist";
const DEFAULT_OUT_FILE_NAME = "template.json";
const NAME = "gen-template";

const cli = new Command(NAME);
cli
  .argument("[inputDir]", "Generate template.json from directory")
  .option(
    "--outDir <outDir>",
    `Out dir to place template relative files, defaults to path.join(dir, "${DEFAULT_OUT_DIR_NAME}")`
  )
  .option(
    "--outFile <outFile>",
    "Template out file path",
    `./${DEFAULT_OUT_FILE_NAME}`
  )
  .option("--overwrite", "Force overwrite", false)
  .action(async (inputDir = ".", options) => {
    inputDir = resolve(inputDir);
    const outDir = resolve(
      options.outDir || join(inputDir, DEFAULT_OUT_DIR_NAME)
    );

    if (!outDir.startsWith(inputDir)) {
      throw new Error(
        `outDir ${outDir} must be inside of input directory ${inputDir}`
      );
    }

    if (fsx.existsSync(outDir)) {
      if (!options.overwrite) {
        throw new Error(
          `outDir ${outDir} already exists. Use --overwrite to overwrite.`
        );
      }

      await fsx.emptyDir(outDir);
    }
    await fsx.ensureDir(outDir);

    const outFile = resolve(options.outFile);
    if (fsx.existsSync(outFile)) {
      if (!options.overwrite) {
        throw new Error(
          `outFile ${outFile} already exists. Use --overwrite to overwrite.`
        );
      }

      await fsx.rm(outFile);
    }

    options = { ...options, root: inputDir, outDir, outFile };
    execute(options);
  });

cli.addHelpText(
  "afterAll",
  `\nExample: ${NAME} ./path/to/template --outFile ./path/to/template.json`
);
cli.parse();

type IPathToCode = Record<string, string>;

async function execute({
  root,
  outDir,
  outFile,
  extraExternals = [],
  skipExternals = [],
}: {
  root: string;
  outDir: string;
  outFile: string;
  extraExternals?: string[];
  skipExternals?: string[];
}): Promise<void> {
  await mkdir(join(outDir, "externals"));
  const { code: externalCode, externals } = await buildExternals(
    root,
    join(outDir, "externals"),
    extraExternals,
    skipExternals
  );

  const projectOutDir = join(outDir, "project");
  await cpy(["./**/*", "./*", "!node_modules"], projectOutDir, {
    cwd: root,
    filter(file) {
      return !file.path.includes(outDir) && !(file.path === outFile);
    },
  });

  const dtsRollup = new DtsRollup({
    entries: await fg(["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"], {
      absolute: true,
      cwd: root,
      ignore: [basename(outDir), "node_modules"],
    }),
    outDir: projectOutDir,
    rootDir: root,
  });
  await dtsRollup.run();

  const json = {
    files: {
      ...(await dirToJson(projectOutDir, "/", ["**/*"])),
    },

    externals: {
      cjsCode: externalCode,
      externals,
    },
  };

  await writeFile(outFile, JSON.stringify(json), "utf-8");
}
async function dirToJson(
  dir: string,
  basePath = "/",
  files: string[],
  replaceContent: (content: string) => string = (x) => x
) {
  const ret: IPathToCode = {};
  const filePaths = await fg(files, {
    cwd: dir,
    absolute: false,
    onlyFiles: true,
  });

  await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await readFile(join(dir, filePath), "utf-8");
      ret[join(basePath, filePath)] = replaceContent(content);
    })
  );
  return ret;
}

async function buildExternals(
  scanSrcDir: string,
  outDir: string,
  extraExternals: string[] = [],
  skipExternals: string[] = []
) {
  const entryFile = join(outDir, "index.ts");
  const outFile = join(outDir, "index.js");
  const externals = [
    ...new Set([...(await scanExternals(scanSrcDir)), ...extraExternals]),
  ].filter((x) => !skipExternals.includes(x));
  await writeFile(
    entryFile,
    `${externals.map((name, index) => `import * as $${index} from "${name}";`).join("\n")}

const modules = {
${externals.map((name, index) => `"${name}": $${index},`).join("\n")}
};

export default modules;
    `
  );

  await build({
    entryPoints: [entryFile],
    bundle: true,
    format: "cjs",
    minify: true,
    outfile: outFile,
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
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  });

  return { code: await readFile(outFile, "utf-8"), externals };
}

async function scanExternals(srcDir: string) {
  const paths = await fg(["**/*"], {
    cwd: srcDir,
    absolute: true,
    ignore: ["node_modules"],
  });
  const project = new Project();

  const externals = new Set<string>();
  paths.forEach((path) => {
    const sourceFile = project.addSourceFileAtPath(path);
    sourceFile.getImportDeclarations().forEach((dec) => {
      if (
        dec.getModuleSpecifierSourceFile()?.isInNodeModules() ||
        /^@?[a-zA-Z]/.test(dec.getModuleSpecifierValue())
      ) {
        externals.add(dec.getModuleSpecifierValue());
      }
      dec.getModuleSpecifierSourceFile()?.getFilePath();
    });
  });

  return externals;
}

function errorCallback(errorOrReason: Error | unknown) {
  // @ts-ignore
  console.error(errorOrReason?.message ?? errorOrReason);
  process.exit(1);
}
