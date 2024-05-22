import { readFile, writeFile, mkdir } from "fs/promises";
import { join, resolve } from "path";
import { DtsRollup } from "@simple-playground-web/dts-rollup";
import fg from "fast-glob";
import { Command } from "commander";
import cpy from "cpy";
import { build } from "esbuild";

import { Project } from "ts-morph";
import temp from "temp";

temp.track();

const cli = new Command("gen-template");
cli
  .argument("[dir]", "Generate template.json from dir")
  .option("--outFile <outFile>", "Template out file", "./template.json")
  .option(
    "--extraExternals [extraExternals...]",
    "Template externals, this cli will scan source files to get external node modules and build them, you can add extra externals manually"
  )
  .action((dir = ".", options) => {
    dir = resolve(dir);
    const outDir = temp.mkdirSync({
      dir,
    });
    const outFile = resolve(options.outFile);
    options = { ...options, root: dir, outDir, outFile };
    execute(options);
  });
cli.parse();

type IPathToCode = Record<string, string>;

async function execute({
  root,
  outDir,
  outFile,
  extraExternals,
}: {
  root: string;
  outDir: string;
  outFile: string;
  extraExternals?: string[];
}): Promise<void> {
  const srcDir = join(root, "src");
  const extraCopyPattern = ["!dist"];

  const projectOutDir = join(outDir, "template");
  const dtsRollup = new DtsRollup({
    entries: await fg(["**/*"], {
      absolute: true,
      cwd: srcDir,
    }),
    ignoreExternals: [],
    outDir: projectOutDir,
    rootDir: root,
  });
  await dtsRollup.run();
  await cpy(
    ["./**/*", "./*", "!node_modules", "!src", ...extraCopyPattern],
    projectOutDir,
    {
      cwd: root,
      filter(file) {
        return !file.path.includes(outDir) && !(file.path === outFile);
      },
    }
  );

  await mkdir(join(outDir, "externals"));
  const externalCode = await buildExternals(
    srcDir,
    join(outDir, "externals"),
    extraExternals
  );

  const json = {
    files: {
      ...(await dirToJson(projectOutDir, "/", ["**/*"])),
    },

    externals: {
      cjsCode: externalCode,
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
  extraExternals: string[] = []
) {
  const entryFile = join(outDir, "index.ts");
  const outFile = join(outDir, "index.js");
  const externals = [
    ...new Set([...(await scanExternals(scanSrcDir)), ...extraExternals]),
  ];
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
  });

  return readFile(outFile, "utf-8");
}

async function scanExternals(srcDir: string) {
  const paths = await fg(["**/*"], {
    cwd: srcDir,
    absolute: true,
  });
  const project = new Project();

  const externals = new Set<string>();
  paths.forEach((path) => {
    const sourceFile = project.addSourceFileAtPath(path);
    sourceFile.getImportDeclarations().forEach((dec) => {
      if (dec.getModuleSpecifierSourceFile()?.isInNodeModules()) {
        externals.add(dec.getModuleSpecifierValue());
      }
    });
  });

  return externals;
}
