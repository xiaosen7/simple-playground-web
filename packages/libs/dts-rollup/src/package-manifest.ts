import { writeFile } from "fs/promises";
import { dirname, join, relative } from "path";

import { findUpSync } from "find-up";
import fsx from "fs-extra";
import logUpdate from "log-update";
import { Project } from "ts-morph";

import { getRelativeImportPath } from "./path";
import { memoize } from "lodash-es";
import { PackageJson } from "type-fest";
import { INodeModulePackageJson } from "./types";

export const getNodeModulePackageJson = memoize(
  (filePath: string): { path: string; manifest: INodeModulePackageJson } => {
    const packageJsonPath = findUpSync("package.json", {
      cwd: dirname(filePath),
    });

    if (!packageJsonPath) {
      throw new Error(`Can't find package.json for ${filePath}`);
    }

    const manifest = fsx.readJSONSync(packageJsonPath);
    if (!manifest.name) {
      return getNodeModulePackageJson(dirname(packageJsonPath));
    }

    return {
      path: packageJsonPath,
      manifest: manifest as INodeModulePackageJson,
    };
  }
);
