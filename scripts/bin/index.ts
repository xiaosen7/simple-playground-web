#!/usr/bin/env tsx
import { readdir } from "fs/promises";
import { basename, join } from "path";

import { Command } from "commander";
import { isString } from "lodash-es";
import { Project, ts } from "ts-morph";
import * as tsconfigPaths from "tsconfig-paths";

import tsconfig from "../tsconfig.json";

import type { SourceFile } from "ts-morph";
import { SCRIPTS_PLACED_ROOT, SCRIPTS_ROOT } from "../src/utils";

(async () => {
  process.on("SIGINT", function () {
    process.exit();
  });

  function errorHandler(error: Error) {
    console.error("命令执行失败");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }

    process.exit(1);
  }
  process.on("uncaughtException", errorHandler);
  process.on("unhandledRejection", errorHandler);

  // tsconfig-paths
  const cleanup = tsconfigPaths.register({
    baseUrl: SCRIPTS_ROOT,
    paths: tsconfig.compilerOptions.paths,
  });
  process.on("exit", () => {
    cleanup();
  });

  const program = new Command().name("scripts");
  const commands = await genCommands();

  commands.forEach(({ name, description, path }) => {
    program
      .command(name)
      .description(description)
      .action(async () => {
        const { default: CommandCtor } = await import(path);
        const command = new CommandCtor();
        console.log(`执行脚本 ${name}： \`${command.description}\``);
        await command.execute();
      });
  });

  program.parse();
})();

async function genCommands() {
  const project = new Project();

  const commandNames = await readdir(SCRIPTS_PLACED_ROOT);

  const commands = [] as Array<{
    name: string;
    description: string;
    path: string;
  }>;
  commandNames.forEach((name) => {
    const sourceFile = project.addSourceFileAtPath(
      join(SCRIPTS_PLACED_ROOT, name)
    );
    const classDeclaration = getDefaultClassDeclaration(sourceFile);
    if (!classDeclaration) {
      throw new Error(
        `Cannot find default exported class in ${sourceFile.getFilePath()}`
      );
    }

    const structure = classDeclaration.getStructure();
    const commandName = basename(name, ".ts");
    const initializer = structure.properties?.find(
      (x) => x.name === "description"
    )?.initializer;
    const description = isString(initializer)
      ? trimQuotationMark(initializer)
      : "";

    const commandObject = {
      name: commandName,
      description,
      path: sourceFile.getFilePath(),
    };
    commands.push(commandObject);
  });

  return commands;

  function trimQuotationMark(str: string) {
    let l = 0;
    let r = str.length - 1;
    while (l < r && str[l] === str[r] && (str[l] === '"' || "'")) {
      l++;
      r--;
    }
    return str.substring(l, r + 1);
  }
  function getDefaultClassDeclaration(sourceFile: SourceFile) {
    const defaultDeclarations = sourceFile
      .getDefaultExportSymbol()
      ?.getDeclarations()[0];
    return defaultDeclarations?.isKind(ts.SyntaxKind.ClassDeclaration)
      ? defaultDeclarations
      : undefined;
  }
}
