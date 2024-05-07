import * as path from "path";

export function getRelativePath(filePath: string) {
  return path.relative(path.resolve(), filePath);
}

export function getRelativeImportPath(from: string, to: string) {
  const relative = path.relative(from, to);

  return formatRelativeImportPath(relative);
}

export function formatRelativeImportPath(relative: string) {
  const rel: string = relative.replace(/(\.d)?\.(c|m)?ts$/, "");

  return rel.startsWith("../") ? rel : rel.startsWith("./") ? rel : `./${rel}`;
}
