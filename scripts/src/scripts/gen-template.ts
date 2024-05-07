import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { DtsRollup } from "@simple-playground-web/dts-rollup";
import fg from "fast-glob";

import { WEBSITE_PUBLIC, WEBSITE_TEMPLATE } from "../utils";

import { Script } from "@/models/script";
import { remove, rm, rmdir } from "fs-extra";

type IPathToCode = Record<string, string>;

(async () => {})();

export default class extends Script<{}> {
  protected description =
    "生成 playground 的模板(website/public/template.json)";
  async execute(): Promise<void> {
    const dtsOut = join(WEBSITE_TEMPLATE, "dts-rollup");
    const dtsRollup = new DtsRollup({
      entries: [join(WEBSITE_TEMPLATE, "src/index.tsx")],
      ignoreExternals: [],
      outDir: dtsOut,
      rootDir: WEBSITE_TEMPLATE,
    });

    await dtsRollup.run();

    const publicDir = WEBSITE_PUBLIC;
    const templateFilePath = join(publicDir, "template.json");

    const json = {
      ...(await dirToJson(dtsOut, "/", ["**/*"])),
      ...(await dirToJson(join(WEBSITE_TEMPLATE), "/", [
        "**/*",
        "!node_modules",
        "!src",
        "!dts-rollup",
        "!dist",
      ])),
    };

    await rm(dtsOut, { recursive: true });
    await writeFile(templateFilePath, JSON.stringify(json), "utf-8");
  }
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

function removeDts(pathToCode: IPathToCode) {
  const ret = { ...pathToCode };
  Object.keys(ret).forEach((key) => {
    if (key.endsWith(".d.ts")) {
      delete ret[key];
    }
  });
  return ret;
}
