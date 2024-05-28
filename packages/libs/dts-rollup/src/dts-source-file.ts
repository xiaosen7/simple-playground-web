import { ExportDeclaration, ImportDeclaration, SourceFile } from "ts-morph";
import { join, dirname } from "path";
import { getNodeModulePackageJson } from "./package-manifest";
import {
  INodeModulesVersionCheckerOptions,
  NodeModulesVersionChecker,
} from "./node-modules";

export interface IDtsSourceFileCollectorOptions {
  versionChecker?: INodeModulesVersionCheckerOptions;
}
export class DtsSourceFileCollector {
  #dtsSourceFileInstanceMap = new Map<SourceFile, DtsSourceFile>();
  #nodeModuleVersionChecker: NodeModulesVersionChecker;
  #sourceFileMap = new Set<SourceFile>();

  constructor(options: IDtsSourceFileCollectorOptions = {}) {
    this.#nodeModuleVersionChecker = new NodeModulesVersionChecker(
      options.versionChecker
    );
  }

  #getOrCreateDtsSourceFile(sourceFile: SourceFile) {
    if (this.#dtsSourceFileInstanceMap.has(sourceFile)) {
      return this.#dtsSourceFileInstanceMap.get(sourceFile)!;
    }

    const dtsSourceFile = new DtsSourceFile(sourceFile);
    this.#dtsSourceFileInstanceMap.set(sourceFile, dtsSourceFile);
    return dtsSourceFile;
  }

  recursivelyAddSourceFile(sourceFile: SourceFile) {
    if (this.#sourceFileMap.has(sourceFile)) {
      return;
    }

    this.#sourceFileMap.add(sourceFile);

    const dtsSourceFile = this.#getOrCreateDtsSourceFile(sourceFile);

    this.#nodeModuleVersionChecker.addAndCheckFilePath(
      sourceFile.getFilePath()
    );

    dtsSourceFile.importAndExportDeclarations.forEach((dec) => {
      const sourceFile = dec.getModuleSpecifierSourceFile();
      if (!sourceFile) {
        return;
      }

      const dtsSourceFile = this.#getOrCreateDtsSourceFile(sourceFile);
      const moduleSpecifierValue = dec.getModuleSpecifierValue();
      if (moduleSpecifierValue) {
        dtsSourceFile.addModuleSpecifierValue(moduleSpecifierValue);
      }

      this.recursivelyAddSourceFile(sourceFile);
    });

    dtsSourceFile.referenceSourceFiles.forEach((sourceFile) => {
      this.recursivelyAddSourceFile(sourceFile);
    });
  }

  getCount() {
    return this.#dtsSourceFileInstanceMap.size;
  }

  getDtsSourceFiles() {
    return Array.from(this.#dtsSourceFileInstanceMap.values());
  }

  getDtsSourceFileBySourceFile(sourceFile: SourceFile) {
    return this.#dtsSourceFileInstanceMap.get(sourceFile);
  }
}

export class DtsSourceFile {
  #moduleSpecifierValues = new Set<string>();
  readonly importAndExportDeclarations: (
    | ExportDeclaration
    | ImportDeclaration
  )[];
  readonly importAndExportSourceFiles: SourceFile[];
  readonly referenceSourceFiles: SourceFile[];

  constructor(private sourceFile: SourceFile) {
    this.importAndExportDeclarations = [
      ...this.sourceFile.getExportDeclarations(),
      ...this.sourceFile.getImportDeclarations(),
    ].filter((x) => {
      return x.getModuleSpecifierValue() && x.getModuleSpecifierSourceFile();
    });
    this.importAndExportSourceFiles = this.importAndExportDeclarations.map(
      (x) => x.getModuleSpecifierSourceFileOrThrow()
    );

    const project = sourceFile.getProject();
    this.referenceSourceFiles = [
      ...sourceFile.getLibReferenceDirectives(),
      ...sourceFile.getPathReferenceDirectives(),
      ...sourceFile.getTypeReferenceDirectives(),
    ]
      .map((fileReference) => {
        const file = project.addSourceFileAtPathIfExists(
          join(dirname(sourceFile.getFilePath()), fileReference.getFileName())
        );
        if (!file) {
          console.warn(
            `Reference source file not found: "${fileReference.getFileName()}", `,
            `at: ${sourceFile.getFilePath()}`
          );
        }

        return file;
      })
      .filter(Boolean) as SourceFile[];
  }

  addModuleSpecifierValue(value: string) {
    this.#moduleSpecifierValues.add(value);
  }

  isNodeModuleMainFile() {
    if (!this.isInNodeModules()) {
      return false;
    }

    const {
      manifest: { name },
    } = this.getPackageJson();
    return this.#moduleSpecifierValues.has(name);
  }

  getPackageJson() {
    return getNodeModulePackageJson(this.sourceFile.getFilePath());
  }

  isInNodeModules() {
    return this.sourceFile.isInNodeModules();
  }

  getFilePath(): string {
    return this.sourceFile.getFilePath();
  }

  getFullText() {
    return this.sourceFile.getFullText();
  }
}
