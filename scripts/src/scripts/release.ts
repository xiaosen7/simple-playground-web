import {
  IProject,
  PKG_ROOT,
  VERSION_FILE,
  findWorkspaceProjects,
} from "@/utils";
import { Script } from "@/models/script";
import { $ } from "execa";
import { simpleGit } from "simple-git";
import { readdir } from "fs/promises";
import { join, resolve } from "path";
import { build } from "tsup";
import { readFile } from "fs-extra";

const MAIN_BRANCH = "main";
const REMOTE_NAME = "origin";

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

    const branch = await git.branch({});

    if (branch.current !== MAIN_BRANCH) {
      throw new Error(`请切换到 ${MAIN_BRANCH} 分支后执行`);
    }

    // 更新版本号
    const targetVersion = await readFile(VERSION_FILE, "utf-8");

    console.log(`upgrade to ${targetVersion}`);

    // 生成 changelog
    await $`pnpm conventional-changelog -p angular -i ./CHANGELOG.md -s`;

    // 生成 git commit
    await git.add(".");
    await git.commit(`chore: update version to ${targetVersion}`);
    await git.push("origin", MAIN_BRANCH);

    // 生成 git tag
    await git.addTag(`release/v${targetVersion}`);
    await git.pushTags("origin");

    // 发布到 npm
    await buildPackages();
    const pkgs = await findWorkspaceProjects({
      excludeRoot: true,
      patterns: ["packages/*"],
    });
    const repository = {
      type: "git",
      url: (await $`git remote get-url origin`).stdout.replace(
        "git@github.com:",
        "git+https://github.com/"
      ),
    };
    await Promise.all(
      pkgs.map((x) =>
        x.writeProjectManifest({
          ...x.manifest,
          version: targetVersion,
          module: "dist/index.js",
          types: "dist/index.d.ts",
          files: ["dist"],
          main: undefined,
          devDependencies: undefined,
          scripts: undefined,
          repository,
        })
      )
    );
    await $`pnpm publish -r --access public --no-git-checks`;

    await $`git restore .`;
  }
}

async function buildPackages() {
  const projects = await findWorkspaceProjects({
    excludeRoot: true,
    patterns: ["packages/*"],
  });
  await Promise.all(projects.map((x) => buildPkgDir(x)));

  async function buildPkgDir(project: IProject) {
    console.log(`Building ${project.manifest.name}`);

    await build({
      entry: [join(project.dir, "src", "index.ts")],
      dts: true,
      outDir: join(project.dir, "dist"),
      silent: true,
      clean: true,
    });
  }
}
