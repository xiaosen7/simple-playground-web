import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { basename, join } from "path";

import { findWorkspacePackages } from "@pnpm/workspace.find-packages";

import { PKG_ROOT } from "./path";

import type { Project } from "@pnpm/types";

export interface IProject extends Project {
  readme: {
    content: string;
    filePath: string;
    write: (content: string) => Promise<void>;
  };
  packageScriptsJSON: {
    content: Record<string, string>;
    filePath: string;
    write: (content: string) => Promise<void>;
  };
}

export async function findWorkspaceProjects(
  opts: { excludeRoot?: boolean } & Parameters<
    typeof findWorkspacePackages
  >[1] = {}
): Promise<IProject[]> {
  let projects = await findWorkspacePackages(PKG_ROOT, opts);
  if (opts.excludeRoot) {
    projects = projects.filter((x) => x.dir !== PKG_ROOT);
  }

  return await Promise.all(
    projects.map(async (project) =>
      fillReadme(project).then(fillPackageScriptsJSON)
    )
  );

  async function fillReadme<T extends Project>(project: T) {
    const filePath = join(project.dir, "README.md");
    const exists = existsSync(filePath);
    const write = (content: string) => writeFile(filePath, content);

    if (!exists) {
      await write(`# ${project.manifest.name ?? basename(project.dir)}`);
    }

    const content = await readFile(filePath, "utf-8");

    return {
      ...project,
      readme: {
        filePath,
        content,
        write,
      },
    };
  }

  async function fillPackageScriptsJSON<T extends Project>(project: T) {
    const filePath = join(project.dir, "package-scripts.json");
    const exists = existsSync(filePath);
    const content = exists ? JSON.parse(await readFile(filePath, "utf-8")) : {};
    const write = (content: string) => writeFile(filePath, content);

    const needExistedKeys = Object.keys(project.manifest.scripts ?? {}).filter(
      (x) => !content[x]
    );
    if (needExistedKeys.length > 0) {
      throw new Error(
        `[${
          project.manifest.name
        }]: 请在 package-scripts.json 中补充 ${needExistedKeys.join(", ")} 描述`
      );
      // needExistedKeys.forEach((key) => (content[key] = '请在 package-scripts.json 中补充说明信息'));
      // await write(JSON.stringify(content, null, 2));
    }

    return {
      ...project,
      packageScriptsJSON: {
        filePath,
        content,
        write,
      },
    };
  }
}
