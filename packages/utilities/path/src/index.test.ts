import { createFilterPattern, dirname, insideDir } from ".";

describe("path", () => {
  test("createFilterPattern", () => {
    const filter = createFilterPattern(["!**/node_modules/**"]);
    expect(filter("a/b/c/d")).toBe(true);
    expect(filter("/node_modules/ds.a")).toBe(false);
    expect(filter("a/node_modules/ds.a")).toBe(false);
  });

  test("createFilterPattern 2", () => {
    const filter = createFilterPattern(["/**/*", "/*"]);
    expect(filter("/index.ts")).toBe(true);
  });

  test("dirname", () => {
    expect(dirname("a/b")).toBe("a");
    expect(dirname("/a/b/")).toBe("/a");

    expect(dirname("a")).toBe(".");
    expect(dirname("/a")).toBe("/");

    expect(dirname("/")).toBe("/");
  });

  test("insideDir", () => {
    expect(insideDir("a/b", "a")).toBe(true);
    expect(insideDir("aa/b", "a")).toBe(false);
  });
});
