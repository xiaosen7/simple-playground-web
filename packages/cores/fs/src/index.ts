import { default as MFS } from "memory-fs";
import { EventEmitter } from "events";
import errors from "errno";
import {
  createFilterPattern,
  dirname,
  relative,
} from "@simple-playground-web/path";
import { Buffer } from "buffer";

// @ts-ignore
import MemoryFileSystemError from "memory-fs/lib/MemoryFileSystemError";

globalThis.Buffer = globalThis.Buffer || Buffer;

export enum EFsEventType {
  Change = "change",
  Rename = "rename",
  Unlink = "unlink",
  Rmdir = "rmdir",
  Mkdir = "mkdir",
}

type IWatchListener = (
  eventType: EFsEventType,
  fileName: string,
  renameFileName?: string
) => void;

const EVENT_NAME = "trigger";

type NoAsyncMFSType = {
  [K in keyof MFS as `${K}Sync` extends keyof MFS ? never : K]: MFS[K];
};
const NoAsyncMFS: new () => NoAsyncMFSType = MFS;

export class FS extends NoAsyncMFS {
  #events = new EventEmitter();
  dirname = dirname;

  watch(fileOrDir: string, listener: IWatchListener) {
    const _listener = (
      type: EFsEventType,
      fileName: string,
      renameFileName?: string
    ) => {
      if (
        fileName.startsWith(fileOrDir) ||
        renameFileName?.startsWith(fileOrDir)
      ) {
        listener(type, fileName, renameFileName);
      }
    };

    this.#events.addListener(EVENT_NAME, _listener);

    return {
      close: () => {
        this.#events.removeListener(EVENT_NAME, _listener);
      },
    };
  }

  unlinkSync = (path: string) => {
    super.unlinkSync(path);
    this.#events.emit(EVENT_NAME, EFsEventType.Unlink, path);
  };

  rmdirSync = (_path: string) => {
    super.rmdirSync(_path);
    this.#events.emit(EVENT_NAME, EFsEventType.Rmdir, _path);
  };

  // @ts-ignore
  mkdirSync(_path: string): void {
    super.mkdirSync(_path);
    this.#events.emit(EVENT_NAME, EFsEventType.Mkdir, _path);
  }

  writeFileSync = (
    _path: string,
    content: string | Buffer,
    encoding?: string | undefined
  ) => {
    const dirname = this.dirname(_path);
    if (dirname !== "" && !this.existsSync(dirname)) {
      this.mkdirpSync(dirname);
    }

    // Because memory-fs doesn't support empty string
    if (content === "") {
      content = " ";
    }

    super.writeFileSync(_path, content, encoding);
    this.#events.emit(EVENT_NAME, EFsEventType.Change, _path);
  };

  readFileSync = (_path: string, encoding?: string | undefined) => {
    let content = super.readFileSync(_path, encoding);

    // Because memory-fs doesn't support empty string
    if (content === " ") {
      content = "";
    }

    return content;
  };

  renameSync = (oldPath: string, newPath: string) => {
    this.#events.emit(EVENT_NAME, EFsEventType.Rename, oldPath, newPath);
    const stat = this.statSync(oldPath);
    if (stat.isDirectory()) {
      this.cpSync(oldPath, newPath);
      this.rmdirSync(oldPath);
    } else {
      this.copyFileSync(oldPath, newPath);
      this.unlinkSync(oldPath);
    }
  };

  /**
   * Synchronously copies the entire directory structure from src to dest, including subdirectories and files.
   * When copying a directory to another directory, globs are not supported and behavior is similar to cp dir1/ dir2/.
   */
  cpSync = (src: string, dest: string) => {
    const stat = this.statSync(src);
    if (!stat.isDirectory()) {
      throw new MemoryFileSystemError(errors.code.ENOTDIR, src, "cpSync");
    }

    if (!this.existsSync(dest)) {
      this.mkdirpSync(dest);
    }

    const dirOrFiles = this.readdirSync(src);
    dirOrFiles.forEach((dirOrFilename) => {
      const srcPath = this.join(src, dirOrFilename);
      const destPath = this.join(dest, dirOrFilename);
      const stat = this.statSync(srcPath);
      if (stat.isDirectory()) {
        this.cpSync(srcPath, destPath);
      } else {
        this.copyFileSync(srcPath, destPath);
      }
    });
  };

  copyFileSync = (src: string, dest: string) => {
    const content = this.readFileSync(src);
    this.writeFileSync(dest, content);
  };

  /**
   * Filter files by using pattern
   * @param pattern
   * @param param1
   * @returns
   */
  globSync = (
    pattern: string[],
    options: {
      /**
       * @default true
       */
      onlyFiles?: boolean;
    } = {}
  ) => {
    const { onlyFiles = true } = options;
    const filter = createFilterPattern(pattern);

    const paths: string[] = [];

    const walk = (absolutePath: string) => {
      const stat = this.statSync(absolutePath);
      const matched = filter(absolutePath);

      if (matched) {
        if (!(onlyFiles && stat.isDirectory())) {
          paths.push(absolutePath);
        }
      }

      if (stat.isDirectory()) {
        const dirOrFilenames = this.readdirSync(absolutePath);
        dirOrFilenames.forEach((dirOrFilename) => {
          const subPath = this.join(absolutePath, dirOrFilename);
          walk(subPath);
        });
      }
    };

    walk("/");

    return paths;
  };

  getFilesByPattern = (
    pattern: string[],
    options?: Parameters<InstanceType<typeof FS>["globSync"]>[1]
  ) => {
    const paths = this.globSync(pattern, options);
    return paths.reduce(
      (files, path) => {
        files[path] = this.readFileSync(path, "utf8");
        return files;
      },
      {} as Record<string, string>
    );
  };
}
