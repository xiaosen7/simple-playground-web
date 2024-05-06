import { findWorkspaceProjects } from "@/utils";
import { Script } from "@/models/script";
import { $ } from "execa";
import { simpleGit } from "simple-git";
import { readdir } from "fs/promises";
import { join, resolve } from "path";
import { build } from "tsup";

const git = simpleGit();

git.outputHandler((_command, stdout, stderr) => {
  stdout.pipe(process.stdout);
  stderr.pipe(process.stderr);
});

export default class extends Script<{}> {
  protected description =
    "构建，发布，更新版本号，生成 changelog，生成 git tag, 发布到 git";

  async execute(): Promise<void> {
    const isClean = (await git.status()).isClean();
    if (!isClean) {
      throw new Error("请提交后执行");
    }

    await buildModules();

    // 更新版本号
    const targetVersion = "0.0.1";

    // 生成 changelog
    await $`pnpm conventional-changelog -p angular -i ./CHANGELOG.md -s`;

    // 生成 git commit
    await git.add(".");
    await git.commit(`chore: update version to ${targetVersion}`);

    // 生成 git tag
    await git.addTag(`release/v${targetVersion}`);

    // 推送 git tag
    // await git.pushTags("origin");

    // 发布到 npm
    // const pkgs = await findWorkspaceProjects();
    // await Promise.all(
    //   pkgs.map((x) =>
    //     x.writeProjectManifest({
    //       ...x.manifest,
    //       version: targetVersion,
    //       module: "dist/index.js",
    //       types: "dist/index.d.ts",
    //       files: ["dist"],
    //       main: undefined,
    //       devDependencies: undefined,
    //       scripts: undefined,
    //     })
    //   )
    // );
    // await $`pnpm publish -r --access public --no-git-checks`;
  }
}

async function buildModules() {
  const pkgDirs = (await readdir("packages")).map((x) =>
    resolve("packages", x)
  );
  // await pkgDirs.reduce(
  //   (task, pkgDir) => task.then(() => buildPkgDir(pkgDir)),
  //   Promise.resolve()
  // );

  await Promise.all(pkgDirs.map((pkgDir) => buildPkgDir(pkgDir)));

  async function buildPkgDir(pkgDir: string) {
    const packageJson = require(join(pkgDir, "package.json"));
    console.log(`Building ${packageJson.name}`);

    await build({
      entry: [join(pkgDir, "src", "index.ts")],
      dts: true,
      outDir: join(pkgDir, "dist"),
      silent: true,
      clean: true,
    });
  }
}
