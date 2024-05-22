import { isAbsolute, join } from "./npm-path";
//@ts-ignore
import picomatch from "picomatch";

export * from "./npm-path";

export function createFilterPattern(pattern: string | string[]) {
  const isMatch = picomatch(pattern, {
    // contains: true,
    // basename: true,
    // bash: true,
    // strictSlashes: true,
  });
  return (x: string) => isMatch(x);
}

export function ensureAbsolute(path: string) {
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  return path;
}

export function insideDir(path: string, dir: string) {
  return path.startsWith(dir.endsWith("/") ? dir : dir + "/");
}

export function resolve(cwd: string, path: string) {
  if (isAbsolute(path)) {
    return path;
  }

  return join(cwd, path);
}
