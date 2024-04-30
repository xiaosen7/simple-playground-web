import { writeFile } from 'fs/promises';
import path, { dirname, join, relative } from 'path';

import { findUpSync } from 'find-up';
import { ensureDir, exists, writeJSON } from 'fs-extra';
import logUpdate from 'log-update';
import { Project } from 'ts-morph';
import type { PackageManifest } from '@pnpm/types';

import { getRelativeImportPath } from './path';

import type { ExportDeclaration, ImportDeclaration, SourceFile } from 'ts-morph';
import { pick } from 'lodash-es';
import { dedent } from 'ts-dedent';

export interface IDtsRollupOptions {
  rootDir: string;
  entries: string[];
  externals: string[];
  outDir: string;
  nodeModules?: {
    /**
     * 生成的 node_modules 文件夹的文件夹名
     * @default 'node_modules'
     */
    dirname?: string;
    /**
     * 写入的 package.json 字段
     */
    writePackageJsonFields?: string[];
    /**
     * 允许哪些模块有多个版本
     */
    allowMultipleVersionModules?: Set<string>;
  };
}
/**
 * 以一个 d.ts 入口文件开始，收集所有他依赖的 d.ts 文件到一个文件夹
 */
export class DtsRollup {
  #project: Project;
  #options: IDtsRollupOptions;

  #sourceFileMap = new Map<
    SourceFile,
    {
      importDeclarations: (ExportDeclaration | ImportDeclaration)[];
      importSourceFiles: SourceFile[];
      packageManifest: PackageManifest;
      packageJsonPath: string;
    }
  >();
  /**
   * name to package.json map
   */
  #nodeModulesCache = new Map<string, PackageManifest>();
  #nodeModulesOutDir: string;

  constructor(options: IDtsRollupOptions) {
    this.#options = options;

    this.#project = new Project({
      compilerOptions: {
        // 为 true 的话会出现有些 sourceFile 无法读取的情况
        preserveSymlinks: false
      }
    });

    this.#nodeModulesOutDir = join(options.outDir, this.#options.nodeModules?.dirname ?? 'node_modules');
  }

  async run() {
    const project = this.#project;
    const { entries, externals, outDir } = this.#options;

    await ensureDir(outDir);

    entries.forEach((entry) => {
      const entrySourceFile = project.addSourceFileAtPath(entry);
      this.#updateMap(entrySourceFile, externals, project);
    });

    let count = this.#sourceFileMap.size;
    console.log(`Total ${count} source files, node modules: ${this.#nodeModulesCache.size}.`);

    const packageJsonOutFields = this.#options.nodeModules?.writePackageJsonFields ?? [];
    const tasks = Array.from(this.#sourceFileMap.keys()).map((sourceFile, index) => async () => {
      logUpdate(`process: ${index + 1}/${this.#sourceFileMap.size}`);
      this.#modifyImportPaths(sourceFile);

      // write package json
      if (sourceFile.isInNodeModules() && packageJsonOutFields.length > 0) {
        const { packageManifest } = this.#sourceFileMap.get(sourceFile)!;
        const packageJsonOutPath = join(this.#getNodeModuleOutDir(packageManifest.name, packageManifest.version), 'package.json');
        await ensureDir(dirname(packageJsonOutPath));
        if (!(await exists(packageJsonOutPath))) {
          count++;
          const packageOutManifest = pick(packageManifest, packageJsonOutFields);
          await writeJSON(packageJsonOutPath, packageOutManifest);
        }
      }

      // write source file
      const outFilePath = this.#getOutFilePath(sourceFile);
      await ensureDir(dirname(outFilePath));
      await writeFile(outFilePath, sourceFile.getFullText(), 'utf8');
    });
    logUpdate.done();

    await tasks.reduce((task, next) => task.then(next), Promise.resolve());

    console.log(`Successfully generate ${count} files${packageJsonOutFields.length > 0 ? ' (including package json file)' : ''}.`);
  }

  #modifyImportPaths(sourceFile: SourceFile) {
    const sourceOutFilePath = this.#getOutFilePath(sourceFile);
    const { importDeclarations, importSourceFiles } = this.#sourceFileMap.get(sourceFile)!;
    importDeclarations.forEach((declaration, index) => {
      if (declaration.isModuleSpecifierRelative() && !declaration.getModuleSpecifierValue()?.includes('node_modules')) {
        return;
      }

      const moduleSourceFile = importSourceFiles[index];
      const moduleOutFilePath = this.#getOutFilePath(moduleSourceFile);

      const moduleSpecifierValue = getRelativeImportPath(dirname(sourceOutFilePath), moduleOutFilePath);

      declaration.setModuleSpecifier(moduleSpecifierValue);
    });
  }

  /**
   * 从入口文件开始递归调用更新 sourceFileMap 和 nodeModulesMap
   * @param sourceFile
   * @param externals
   * @param project
   * @returns
   */
  #updateMap(sourceFile: SourceFile, externals: string[], project: Project) {
    if (this.#sourceFileMap.has(sourceFile)) {
      return;
    }

    const { manifest, path: packageJsonPath } = resolvePackageManifest(sourceFile.getFilePath());
    const { name, version } = manifest;
    if (!this.#nodeModulesCache.has(name)) {
      this.#nodeModulesCache.set(name, manifest);
    }

    const existingVersion = this.#nodeModulesCache.get(name)!.version;
    if (existingVersion !== manifest.version && !this.#options.nodeModules?.allowMultipleVersionModules?.has(name)) {
      throw new Error(
        dedent`The version of ${name} is not consistent, current version: ${version}, existing version: ${existingVersion}. 
        You may need to set resolutions in package.json like \`${name}: x.y.z\` and reinstall.`
      );
    }

    const { importDeclarations, importSourceFiles, referenceSourceFiles } = this.#analyzeSourceFile(sourceFile, externals, project);
    this.#sourceFileMap.set(sourceFile, {
      importDeclarations,
      importSourceFiles,
      /**
       * 不使用 manifest，是因为使用缓存里的，可以引用同一个内存地址
       */
      packageManifest: this.#nodeModulesCache.get(name)!,
      packageJsonPath
    });

    [...importSourceFiles, ...referenceSourceFiles].forEach((file) => {
      this.#updateMap(file, externals, project);
    });
  }

  /**
   * 检查所有导入的语句，获取 sourceFile，并保存到 map 中
   * @param sourceFile
   * @param externals
   * @returns
   */
  // #detectImportDeclarations(sourceFile: SourceFile, externals: string[]) {
  //   const ret = [...sourceFile.getExportDeclarations(), ...sourceFile.getImportDeclarations()].filter((x) => {
  //     return x.getModuleSpecifierValue() && !externals.includes(x.getModuleSpecifierValue()!) && x.getModuleSpecifierSourceFile();
  //   });
  //   const importSourceFiles = ret.map((x) => x.getModuleSpecifierSourceFileOrThrow());
  //   this.#sourceFileMap.set(sourceFile, {
  //     importDeclarations: ret,
  //     importSourceFiles
  //   });
  //   return ret;
  // }

  #analyzeSourceFile(sourceFile: SourceFile, externals: string[], project: Project) {
    /**
     * import 语句的 所有 sourceFile
     */
    const importDeclarations = [...sourceFile.getExportDeclarations(), ...sourceFile.getImportDeclarations()].filter((x) => {
      return x.getModuleSpecifierValue() && !externals.includes(x.getModuleSpecifierValue()!) && x.getModuleSpecifierSourceFile();
    });
    const importSourceFiles = importDeclarations.map((x) => x.getModuleSpecifierSourceFileOrThrow());

    /**
     *  `/// <reference />` 语句的所有 sourceFile
     */
    const referenceSourceFiles = [
      ...sourceFile.getLibReferenceDirectives(),
      ...sourceFile.getPathReferenceDirectives(),
      ...sourceFile.getTypeReferenceDirectives()
    ]
      .map((fileReference) => {
        if (externals.includes(fileReference.getFileName())) {
          return undefined;
        }

        const file = project.addSourceFileAtPathIfExists(path.join(dirname(sourceFile.getFilePath()), fileReference.getFileName()));
        if (!file) {
          console.warn('Reference file not found: ' + fileReference.getFileName());
        }

        return file;
      })
      .filter(Boolean) as SourceFile[];

    return { referenceSourceFiles, importSourceFiles, importDeclarations };
  }

  #getNodeModuleOutDir(name: string, version: string) {
    return join(this.#nodeModulesOutDir, this.#options.nodeModules?.allowMultipleVersionModules?.has(name) ? `${name}-v${version}` : name);
  }

  #getOutFilePath(sourceFile: SourceFile) {
    const { rootDir, outDir } = this.#options;
    const originalFilePath = sourceFile.getFilePath();
    const relativePathString = path.relative(rootDir, originalFilePath);
    const isOutside = path.relative(rootDir, originalFilePath).startsWith('..');

    if (sourceFile.isInNodeModules()) {
      const {
        packageManifest: { name, version },
        packageJsonPath
      } = this.#sourceFileMap.get(sourceFile)!;
      const packagePath = dirname(packageJsonPath);

      return path.join(this.#getNodeModuleOutDir(name, version), relative(packagePath, originalFilePath));
    }

    if (isOutside) {
      return path.join(outDir, 'outside', relativePathString.replaceAll('../', '__/'));
    }

    return path.join(outDir, relativePathString);
  }
}

function resolvePackageManifest(filePath: string) {
  const packageJsonPath = findUpSync('package.json', {
    cwd: dirname(filePath)
  });
  if (!packageJsonPath) {
    throw new Error(`Can't find package.json for ${filePath}`);
  }

  return { path: packageJsonPath, manifest: require(packageJsonPath) as PackageManifest };
}
