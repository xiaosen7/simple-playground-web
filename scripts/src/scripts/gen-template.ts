import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { DtsRollup } from "@simple-playground-web/dts-rollup";
import fg from "fast-glob";

import { WEBSITE_PUBLIC, TEMPLATE_ROOT } from "../utils";

import { Script } from "@/models/script";
import { remove, rm, rmdir } from "fs-extra";

type IPathToCode = Record<string, string>;

(async () => {})();

export default class extends Script<{}> {
  protected description =
    "生成 playground 的模板(website/public/template.json)";
  async execute(): Promise<void> {
    const dtsOut = join(TEMPLATE_ROOT, "dts-rollup");
    const dtsRollup = new DtsRollup({
      entries: await fg(["src/**/*"], {
        absolute: true,
        cwd: TEMPLATE_ROOT,
      }),
      ignoreExternals: [],
      outDir: dtsOut,
      rootDir: TEMPLATE_ROOT,
    });

    await dtsRollup.run();

    const publicDir = WEBSITE_PUBLIC;
    const templateFilePath = join(publicDir, "template.json");

    const json = {
      ...(await dirToJson(dtsOut, "/", ["**/*"])),
      ...(await dirToJson(join(TEMPLATE_ROOT), "/", [
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
