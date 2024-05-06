import path, { relative } from "path";

export const PKG_ROOT = path.join(__dirname, "..", "..", "..");
export const VERSION_FILE = path.join(PKG_ROOT, ".version");
export const WEBSITE_ROOT = path.join(PKG_ROOT, "packages", "website");
export const WEBSITE_TEMPLATE = path.join(
  WEBSITE_ROOT,
  ".dumi",
  "modules",
  "playground",
  "template"
);
export const WEBSITE_PUBLIC = path.join(WEBSITE_ROOT, "public");
export const WEBSITE_OUT = path.join(WEBSITE_ROOT, "out");
export const SDK_ROOT = path.join(PKG_ROOT, "packages", "sdk");
export const SDK_DIST = path.join(SDK_ROOT, "dist");
export const SERVER_ROOT = path.join(PKG_ROOT, "packages", "server");
export const SERVER_DOCS_ROOT = path.join(SERVER_ROOT, "docs");
export const CUSTOM_ROOT = path.join(PKG_ROOT, "packages", "custom");
export const SCRIPTS_ROOT = path.join(PKG_ROOT, "scripts");
export const SCRIPTS_PLACED_ROOT = path.join(SCRIPTS_ROOT, "src", "scripts");
export const DG29_ROOT = path.join(PKG_ROOT, "packages", "dg29");

export function getRelativeFromPkgRoot(path: string) {
  return `./${relative(PKG_ROOT, path)}`;
}

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
