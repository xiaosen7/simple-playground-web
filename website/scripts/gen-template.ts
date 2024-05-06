import { readFile, writeFile } from "fs/promises";
import { join } from "path";

import fg from "fast-glob";

type IPathToCode = Record<string, string>;

(async () => {
  const publicDir = join(__dirname, "..", "public");
  const templateFilePath = join(publicDir, "template.json");

  const json = await dirToJson(join(__dirname, "..", "..", "template"), "/", [
    "**/*",
  ]);
  await writeFile(templateFilePath, JSON.stringify(json), "utf-8");
})();

async function dirToJson(
  dir: string,
  basePath = "/",
  patterns: string[],
  replaceContent: (content: string) => string = (x) => x
) {
  const ret: IPathToCode = {};
  const filePaths = await fg(patterns, {
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
