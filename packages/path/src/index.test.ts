import { createFilterPattern } from ".";

describe("path", () => {
  test("createFilterPattern", () => {
    const filter = createFilterPattern(["!**/node_modules/**", "**/*"]);
    expect(filter("a/b/c/d")).toBe(true);
    expect(filter("node_modules/ds.a")).toBe(false);
    expect(filter("a/node_modules/ds.a")).toBe(false);
  });
});
