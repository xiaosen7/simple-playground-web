import { ISafeAny } from "@simple-playground-web/types";

const TYPE_SET = new Set([
  "d.ts",
  "css",
  "js",
  "ts",
  "json",
  "tsx",
  "jsx",
] as const);
export type IFileType = typeof TYPE_SET extends Set<infer R> ? R : never;

export class FileTypeClassifier {
  #map = new Map<string, Set<string>>();

  constructor() {}

  #getExt(filePath: string) {
    return filePath.endsWith(".d.ts") ? "d.ts" : filePath.split(".").pop();
  }

  addFile(filePath: string) {
    const ext = this.#getExt(filePath);
    if (!ext) {
      return;
    }

    let set = this.#map.get(ext);
    if (!set) {
      this.#map.set(ext, new Set([filePath]));
    } else {
      set.add(filePath);
    }
  }

  getFiles(extensions: IFileType[]) {
    return extensions
      .map((ext) => [...(this.#map.get(ext) ?? [])])
      .flat() as string[];
  }

  remove(filePath: string) {
    const ext = this.#getExt(filePath);
    if (!ext) {
      return;
    }

    const set = this.#map.get(ext);
    if (set) {
      set.delete(filePath);
    }
  }

  has(filePath: string) {
    const ext = this.#getExt(filePath);
    return !!this.#map.get(ext)?.has(filePath);
  }
}
