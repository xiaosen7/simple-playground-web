import {
  IProject,
  PKG_ROOT,
  VERSION_FILE,
  findWorkspaceProjects,
} from "@/utils";
import { Script } from "@/models/script";
import { $ } from "execa";
import { simpleGit } from "simple-git";
import { readdir, writeFile } from "fs/promises";
import { join, resolve } from "path";
import { build } from "tsup";
import { ensureFile, readFile } from "fs-extra";
import { isObject } from "lodash-es";

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
    const version = await readFile(VERSION_FILE, "utf-8");
    const tag = `release/v${version}`;

    await check(tag);
    console.log(`upgrading to ${version}`);

    try {
      const pkgs = await findWorkspaceProjects({
        excludeRoot: true,
        patterns: ["packages/**/*"],
      });
      await Promise.all(
        pkgs.map((x) =>
          x.writeProjectManifest({
            ...x.manifest,
            version: version,
          })
        )
      );

      await buildPackages();

      // 生成 changelog
      await $({
        stdio: "inherit",
      })`pnpm conventional-changelog -p angular -i ./CHANGELOG.md -s`;

      // 生成 git commit
      await git.add(".");
      await git.commit(`chore: update version to v${version}`);

      // 生成 git tag
      await git.addTag(tag);

      await git.pushTags("origin");
      await git.push("origin", MAIN_BRANCH);

      // 发布到 npm
      const repository = {
        type: "git",
        url: (await $`git remote get-url origin`).stdout.replace(
          "git@github.com:",
          "git+https://github.com/"
        ),
      };
      await Promise.all(
        pkgs.map(async (x) => {
          //bin-dev/index.ts
          const bin = x.manifest.bin;
          if (bin && isObject(bin)) {
            const [name, path] = Object.entries(bin).filter(([name, path]) =>
              path.includes("bin-dev/index.ts")
            )[0];
            if (name && path) {
              await ensureFile(join(x.dir, "bin", "index.mjs"));
              await writeFile(
                join(x.dir, "bin", "index.mjs"),
                `#!/usr/bin/env node
              import "../dist/index.mjs";
              `
              );
              bin[name] = "./bin/index.mjs";
            }
          }

          await x.writeProjectManifest({
            ...x.manifest,
            version: version,
            module: "dist/index.mjs",
            types: "dist/index.d.mts",
            files: ["dist"],
            main: undefined,
            devDependencies: undefined,
            repository,
            bin,
          });
        })
      );
      await $({
        stdio: "inherit",
      })`pnpm publish -r --access public --no-git-checks`;
      console.log(`Release ${version} successfully.`);
    } catch (error) {
      console.log(`Release failed.`);
      console.error(error);
    }

    await $`git restore .`;
  }
}

async function check(tag: string) {
  const isNpmLogin = !!(await $`npm whoami`).stdout;
  if (!isNpmLogin) {
    throw new Error("请先登录 npm");
  }

  const isClean = (await git.status()).isClean();
  if (!isClean) {
    throw new Error("请提交后执行");
  }

  const branch = await git.branch({});

  if (branch.current !== MAIN_BRANCH) {
    throw new Error(`请切换到 ${MAIN_BRANCH} 分支后执行`);
  }

  const tagExists = (await git.tag()).includes(tag);
  if (tagExists) {
    throw new Error(`tag ${tag} 已存在`);
  }
}

async function buildPackages() {
  const projects = await findWorkspaceProjects({
    excludeRoot: true,
    patterns: ["packages/**/*"],
  });
  await projects.reduce(
    (pre, project) => pre.then(() => buildProject(project)),
    Promise.resolve()
  );

  async function buildProject(project: IProject) {
    console.log(`Building ${project.manifest.name}`);

    const cwd = process.cwd();
    process.chdir(project.dir);

    await build({
      entry: [join(project.dir, "src", "index.ts")],
      outDir: join(project.dir, "dist"),
      silent: true,
      clean: true,
      format: ["esm"],
      tsconfig: join(project.dir, "tsconfig.json"),
      external: [
        ...Object.keys(project.manifest.dependencies ?? {}),
        ...Object.keys(project.manifest.peerDependencies ?? {}),
      ],
      dts: true,
    });

    process.chdir(cwd);
  }
}
