import { writeFile } from "fs/promises";
import { dirname, join, relative } from "path";

import { findUpSync } from "find-up";
import fsx from "fs-extra";
import logUpdate from "log-update";
import { Project } from "ts-morph";

import { getRelativeImportPath } from "./path";

import type {
  ExportDeclaration,
  ImportDeclaration,
  SourceFile,
} from "ts-morph";
import { pick } from "lodash-es";
import { dedent } from "ts-dedent";
import { DtsSourceFile, DtsSourceFileCollector } from "./dts-source-file";
import { getNodeModulePackageJson } from "./package-manifest";
import { INodeModulesVersionCheckerOptions } from "./node-modules";
import { PackageJson } from "type-fest";

const {
  ensureDir,
  ensureDirSync,
  exists,
  existsSync,
  writeFileSync,
  writeJSON,
  readJSONSync,
} = fsx;

export interface IDtsRollupOptions {
  rootDir: string;
  entries: string[];
  outDir: string;
  nodeModules?: {
    /**
     * 写入的 package.json 字段
     */
    writePackageJsonFields?: (keyof PackageJson)[];
    /**
     * 允许哪些模块有多个版本
     */
    versionChecker?: INodeModulesVersionCheckerOptions;
  };
}
/**
 * 以 *.ts 入口文件开始，收集所有他依赖的 d.ts 文件到一个文件夹
 */
export class DtsRollup {
  #project: Project;
  #options: IDtsRollupOptions;

  #nodeModulesOutDir: string;
  #dtsSourceFileCollector: DtsSourceFileCollector;

  constructor(options: IDtsRollupOptions) {
    this.#options = options;

    this.#project = new Project({
      compilerOptions: {
        // 为 true 的话会出现有些 sourceFile 无法读取的情况
        preserveSymlinks: false,
      },
    });

    this.#nodeModulesOutDir = join(options.outDir, "node_modules");

    this.#dtsSourceFileCollector = new DtsSourceFileCollector({
      versionChecker: options.nodeModules?.versionChecker,
    });
  }

  async run() {
    console.time("time");
    const project = this.#project;
    const { entries, outDir } = this.#options;

    await ensureDir(outDir);

    entries.forEach((entry) => {
      const entrySourceFile = project.addSourceFileAtPath(entry);
      this.#dtsSourceFileCollector.recursivelyAddSourceFile(entrySourceFile);
    });

    let count = this.#dtsSourceFileCollector.getCount();
    console.log(`Total ${count} source files.`);

    const packageJsonOutFields =
      this.#options.nodeModules?.writePackageJsonFields ?? [];
    const tasks = this.#dtsSourceFileCollector
      .getDtsSourceFiles()
      .map((dtsSourceFile, index) => async () => {
        logUpdate(
          `processing(${index + 1}/${count}): ${dtsSourceFile.getFilePath()}`
        );

        // write package json
        if (packageJsonOutFields.length > 0) {
          const { manifest: packageManifest } = dtsSourceFile.getPackageJson();
          const packageJsonOutPath = join(
            this.#getNodeModuleOutDir(
              packageManifest.name,
              packageManifest.version
            ),
            "package.json"
          );
          await ensureDir(dirname(packageJsonOutPath));
          if (!(await exists(packageJsonOutPath))) {
            const packageOutManifest = pick(
              packageManifest,
              packageJsonOutFields
            );
            await writeJSON(packageJsonOutPath, packageOutManifest);
          }
        }

        // write source file
        const outFilePath = this.#getOutFilePath(dtsSourceFile);
        if (dtsSourceFile.isNodeModuleMainFile()) {
          const {
            manifest: { name, version },
            path: packageJsonPath,
          } = dtsSourceFile.getPackageJson();
          const packagePath = dirname(packageJsonPath);
          const normalOutFilePath = join(
            this.#getNodeModuleOutDir(name, version),
            relative(packagePath, dtsSourceFile.getFilePath())
          );

          if (outFilePath !== normalOutFilePath) {
            this.#modifyImportPaths(dtsSourceFile);
          }
        }

        await ensureDir(dirname(outFilePath));
        await writeFile(outFilePath, dtsSourceFile.getFullText(), "utf8");
      });

    await tasks.reduce((task, next) => task.then(next), Promise.resolve());
    logUpdate.done();

    console.log(
      `Successfully generate ${count} files${
        packageJsonOutFields.length > 0 ? " (including package json file)" : ""
      }.`
    );
    console.timeEnd("time");
  }

  #modifyImportPaths(dtsSourceFile: DtsSourceFile) {
    const sourceOutFilePath = this.#getOutFilePath(dtsSourceFile);
    const importDeclarations = dtsSourceFile.importAndExportDeclarations;
    const sourceFiles = dtsSourceFile.importAndExportSourceFiles;
    importDeclarations.forEach((declaration, index) => {
      if (!declaration.isModuleSpecifierRelative()) {
        return;
      }

      // this will be bad performance
      // const sourceFile = declaration.getModuleSpecifierSourceFile();

      const sourceFile = sourceFiles[index];

      const dtsSourceFile =
        this.#dtsSourceFileCollector.getDtsSourceFileBySourceFile(sourceFile!);
      if (!dtsSourceFile) {
        return;
      }

      const moduleOutFilePath = this.#getOutFilePath(dtsSourceFile);
      const moduleSpecifierValue = getRelativeImportPath(
        dirname(sourceOutFilePath),
        moduleOutFilePath
      );
      declaration.setModuleSpecifier(moduleSpecifierValue);
    });
  }

  #getNodeModuleOutDir(name: string, version?: string) {
    return join(this.#nodeModulesOutDir, name);
  }

  #getOutFilePath(dtsSourceFile: DtsSourceFile) {
    const { rootDir, outDir } = this.#options;
    const filePath = dtsSourceFile.getFilePath();
    const relativeToRootPath = relative(rootDir, filePath);
    const isOutside = relative(rootDir, filePath).startsWith("..");

    if (dtsSourceFile.isInNodeModules()) {
      const {
        manifest: { name, version },
        path: packageJsonPath,
      } = dtsSourceFile.getPackageJson();
      if (dtsSourceFile.isNodeModuleMainFile()) {
        return join(this.#getNodeModuleOutDir(name, version), "index.d.ts");
      }

      const packagePath = dirname(packageJsonPath);
      return join(
        this.#getNodeModuleOutDir(name, version),
        relative(packagePath, filePath)
      );
    }

    if (isOutside) {
      return join(
        this.#nodeModulesOutDir,
        "__outside__",
        relativeToRootPath.replaceAll("../", "__/")
      );
    }

    return join(outDir, relativeToRootPath);
  }
}
