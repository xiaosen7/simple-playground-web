import { readdir } from "fs/promises";
import { join, resolve } from "path";
import { build } from "tsup";

(async () => {
  const pkgDirs = (await readdir("packages")).map((x) =>
    resolve("packages", x)
  );
  await pkgDirs.reduce(
    (task, pkgDir) => task.then(() => buildPkgDir(pkgDir)),
    Promise.resolve()
  );

  async function buildPkgDir(pkgDir: string) {
    const packageJson = require(join(pkgDir, "package.json"));
    console.log(`Building ${packageJson.name}...`);

    await build({
      entry: [join(pkgDir, "src", "index.ts")],
      dts: true,
      outDir: join(pkgDir, "dist"),
    });
  }
})();
