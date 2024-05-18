import { ISafeAny } from "@simple-playground-web/types";
import { basename, ensureAbsolute, join } from "@simple-playground-web/path";
import { BehaviorSubject, ReplaySubject } from "rxjs";

type IName = string;

interface IDirectoryInputJSON {
  name: IName;
  children: Array<IFileInputJSON | IDirectoryInputJSON>;
}

interface IDirectoryOutputJSON {
  path: IName;
  name: IName;
  children: Array<IFileOutputJSON | IDirectoryOutputJSON>;
}

interface IFileInputJSON {
  name: IName;
}

interface IFileOutputJSON {
  path: IName;
  name: IName;
}

abstract class Base<TJSON = ISafeAny> {
  parent$: BehaviorSubject<Directory | null>;
  name$: BehaviorSubject<string>;

  constructor(name: string) {
    this.name$ = new BehaviorSubject<string>(name);
    this.parent$ = new BehaviorSubject<Directory | null>(null);
  }

  isDirectory() {
    return this instanceof Directory;
  }

  isFile() {
    return this instanceof File;
  }

  asDirectory() {
    return this as unknown as Directory;
  }

  asFile() {
    return this as unknown as File;
  }

  getPath(absolutely?: boolean): string {
    const parentPath = this.parent$.getValue()?.getPath() ?? "";

    let path: string;
    if (parentPath) {
      path = join(parentPath, this.name$.getValue());
    } else {
      path = this.name$.getValue();
    }

    return absolutely ? ensureAbsolute(path) : path;
  }

  destroy() {
    this.parent$.complete();
    this.name$.complete();
    this.parent$.getValue()?.removeChildren(this);
  }

  abstract toJSON(absolutely?: boolean): TJSON;
}

export class Directory extends Base<IDirectoryOutputJSON> {
  static fromPaths(
    paths: IName[],
    rootName: IName = "",
    isDirectory: (name: IName) => boolean = (x) => !x.includes(".")
  ) {
    interface IDirectoryInputMap {
      children: {
        [key: string]: IDirectoryInputMap;
      };
      name: IName;
    }

    const rootMap = buildMap();
    const json = buildJSON(rootMap, true);

    return Directory.fromJSON(json);

    function buildMap() {
      const rootMap: IDirectoryInputMap = {
        children: {},
        name: rootName,
      };

      paths.forEach((filepath) => {
        const names = filepath.split("/").filter((x) => x !== "");
        names.reduce((parent: IDirectoryInputMap, name, index) => {
          const foundNode = parent.children[name];
          if (foundNode) {
            return foundNode as IDirectoryInputMap;
          }

          const node: IDirectoryInputMap = {
            name: name,
            children: {},
          };
          parent.children[name] = node;
          return node;
        }, rootMap);
      });

      return rootMap;
    }

    function buildJSON<TIsRoot extends boolean>(
      map: IDirectoryInputMap,
      isRoot: TIsRoot
    ) {
      let ret: TIsRoot extends true
        ? IDirectoryInputJSON
        : IFileInputJSON | IDirectoryInputJSON;

      if (isRoot || isDirectory(map.name)) {
        ret = {
          name: map.name,
          children: Object.keys(map.children).map((childName) => {
            const childMap = map.children[childName];
            return buildJSON(childMap, false);
          }),
        } as ISafeAny;
      } else {
        ret = {
          name: map.name,
        } as ISafeAny;
      }

      return ret;
    }
  }

  static fromJSON(data: IDirectoryInputJSON) {
    const directory = new Directory(data.name);
    data.children.forEach((child) => {
      if ("children" in child) {
        directory.add(Directory.fromJSON(child));
      } else {
        directory.add(File.fromJSON(child));
      }
    });
    return directory;
  }

  #children = new Set<Directory | File>();

  getFileOrDirectoryByPath(path: string): Directory | File | undefined {
    const names = path.split("/").filter((x) => x !== "");

    return get(this, 0);

    function get(directory: Directory, index: number) {
      const name = names[index];
      if (!name) {
        return directory;
      }

      const children = [...directory.#children];

      const found = children.find((child) => child.name$.getValue() === name);
      if (!found) {
        return undefined;
      }

      if (found.isDirectory()) {
        return get(found.asDirectory(), index + 1);
      }

      return found.asFile();
    }
  }

  add(...fileOrDirectories: Array<Base>) {
    fileOrDirectories.forEach((fileOrDirectory) => {
      if (!this.#children.has(fileOrDirectory)) {
        fileOrDirectory.parent$?.getValue()?.removeChildren(fileOrDirectory);
        fileOrDirectory.parent$.next(this);
        this.#children.add(fileOrDirectory);
      }
    });
  }

  removeChildren(...fileOrDirectories: Array<Base>) {
    fileOrDirectories.forEach((fileOrDirectoryOrPath) => {
      if (this.#children.has(fileOrDirectoryOrPath)) {
        fileOrDirectoryOrPath.parent$?.next(null);
        this.#children.delete(fileOrDirectoryOrPath);
      }
    });
  }

  size() {
    return this.#children.size;
  }

  toJSON(absolutely = false): IDirectoryOutputJSON {
    return getDirectoryJSON(this, "", absolutely);

    function getDirectoryJSON(
      directoryOrFile: Directory,
      parentPath: string,
      absolutely = false
    ) {
      const ret: IDirectoryOutputJSON = {
        name: directoryOrFile.name$.getValue(),
        children: [],
        path: parentPath
          ? join(parentPath, directoryOrFile.name$.getValue())
          : directoryOrFile.name$.getValue(),
      };

      if (absolutely && !ret.path.startsWith("/")) {
        ret.path = `/${ret.path}`;
      }

      directoryOrFile.#children.forEach((directoryOrFile) => {
        if (directoryOrFile.isDirectory()) {
          const json = getDirectoryJSON(
            directoryOrFile.asDirectory(),
            ret.path
          );
          ret.children.push(json);
        } else {
          const json = directoryOrFile.toJSON();
          json.path = join(ret.path, json.path);
          ret.children.push(json);
        }
      });

      return ret;
    }
  }

  toPaths(absolutely = false): string[] {
    return getPaths(this, "", absolutely);

    function getPaths(
      directory: Directory,
      parentPath: string,
      absolutely = false
    ) {
      let currentPath = parentPath
        ? join(parentPath, directory.name$.getValue())
        : directory.name$.getValue();
      if (absolutely && !currentPath.startsWith("/")) {
        currentPath = `/${currentPath}`;
      }

      const ret: string[] = [];
      if (currentPath !== "") {
        ret.push(currentPath);
      }

      directory.#children.forEach((directoryOrFile) => {
        if (directoryOrFile.isDirectory()) {
          ret.push(...getPaths(directoryOrFile.asDirectory(), currentPath));
        } else {
          ret.push(join(currentPath, directoryOrFile.name$.getValue()));
        }
      });

      return ret;
    }
  }

  destroy(): void {
    super.destroy();
    this.#children.forEach((x) => x.destroy());
  }
}

export class File extends Base<IFileOutputJSON> {
  static fromJSON(data: IFileInputJSON) {
    const { name } = data;
    return new File(name);
  }

  toJSON(absolutely = false): IFileOutputJSON {
    const json = {
      name: this.name$.getValue(),
      path: this.name$.getValue(),
    };

    if (absolutely && !json.path.startsWith("/")) {
      json.path = `/${json.path}`;
    }

    return json;
  }
}
