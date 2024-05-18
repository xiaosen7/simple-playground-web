import { Directory, File } from ".";

describe("Directory", () => {
  test("size", () => {
    const directory = new Directory("");
    directory.add(new Directory("src"));
    directory.add(new File("package.json"));
    expect(directory.size()).toBe(2);
  });

  describe("toJSON", () => {
    test("base", () => {
      const directory = new Directory("root");

      const src = new Directory("src");
      src.add(new File("index.ts"));

      directory.add(src);
      directory.add(new File("package.json"));

      expect(directory.toJSON()).toMatchInlineSnapshot(`
        {
          "children": [
            {
              "children": [
                {
                  "name": "index.ts",
                  "path": "root/src/index.ts",
                },
              ],
              "name": "src",
              "path": "root/src",
            },
            {
              "name": "package.json",
              "path": "root/package.json",
            },
          ],
          "name": "root",
          "path": "root",
        }
      `);
    });

    test("absolutely", () => {
      const src = new Directory("src");
      expect(src.toJSON(true)).toMatchInlineSnapshot(`
        {
          "children": [],
          "name": "src",
          "path": "/src",
        }
      `);

      const empty = new Directory("");
      empty.add(new File("index.ts"));
      expect(empty.toJSON(false)).toMatchInlineSnapshot(`
        {
          "children": [
            {
              "name": "index.ts",
              "path": "index.ts",
            },
          ],
          "name": "",
          "path": "",
        }
      `);
      expect(empty.toJSON(true)).toMatchInlineSnapshot(`
        {
          "children": [
            {
              "name": "index.ts",
              "path": "/index.ts",
            },
          ],
          "name": "",
          "path": "/",
        }
      `);
    });
  });

  test("rename", () => {
    const root = new Directory("root");
    const packageJson = new File("package.json");

    root.add(packageJson);

    packageJson.name$.next("app.ts");
    expect(root.toJSON()).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "name": "app.ts",
            "path": "root/app.ts",
          },
        ],
        "name": "root",
        "path": "root",
      }
    `);
  });

  test("remove", () => {
    const root = new Directory("root");
    const packageJson = new File("package.json");

    root.add(packageJson);

    root.removeChildren(packageJson);
    expect(root.toJSON()).toMatchInlineSnapshot(`
      {
        "children": [],
        "name": "root",
        "path": "root",
      }
    `);
  });

  test("toPaths", () => {
    const paths = ["src/index.ts"];
    expect(Directory.fromPaths(paths).toPaths()).toMatchInlineSnapshot(`
      [
        "src",
        "src/index.ts",
      ]
    `);

    expect(Directory.fromPaths(paths).toPaths(true)).toMatchInlineSnapshot(`
      [
        "/",
        "/src",
        "/src/index.ts",
      ]
    `);
  });

  describe("static", () => {
    test("fromJSON", () => {
      const json = {
        children: [
          {
            children: [
              {
                name: "index.ts",
                path: "root/src/index.ts",
              },
            ],
            name: "src",
            path: "root/src",
          },
          {
            name: "package.json",
            path: "root/package.json",
          },
        ],
        name: "root",
        path: "root",
      };
      const directory = Directory.fromJSON(json);
      expect(directory.toJSON()).toEqual(json);
    });

    test("fromPaths", () => {
      const paths = ["/src"];
      const directory = Directory.fromPaths(paths);
      expect(directory.toJSON()).toMatchInlineSnapshot(`
        {
          "children": [
            {
              "children": [],
              "name": "src",
              "path": "src",
            },
          ],
          "name": "",
          "path": "",
        }
      `);
    });
  });

  test("getFileOrDirectoryByPath", () => {
    const root = Directory.fromPaths(["root/src/index.ts"]);

    expect(root.getFileOrDirectoryByPath("root")?.name$.getValue()).toBe(
      "root"
    );
    expect(root.getFileOrDirectoryByPath("/root")?.name$.getValue()).toBe(
      "root"
    );
    expect(root.getFileOrDirectoryByPath("root/src")?.name$.getValue()).toBe(
      "src"
    );
    expect(
      root.getFileOrDirectoryByPath("root/src/index.ts")?.name$.getValue()
    ).toBe("index.ts");
    expect(root.getFileOrDirectoryByPath("src")).toBe(undefined);
  });

  test("parent", () => {
    const root = Directory.fromPaths(["src/index.ts"]);
    const src = root.getFileOrDirectoryByPath("src") as Directory;
    const index = src.getFileOrDirectoryByPath("index.ts") as File;
    expect(src.parent$.getValue()).toBe(root);
    expect(index.parent$.getValue()).toBe(src);
    src.removeChildren(index);
    expect(index.parent$.getValue()).toBe(null);
  });

  test("getPath", () => {
    const root = Directory.fromPaths(["src/index.ts"]);
    const index = root.getFileOrDirectoryByPath("src/index.ts") as File;
    expect(index.getPath()).toBe("src/index.ts");
  });
});

describe("File", () => {
  test("toJSON", () => {
    expect(new File("index.ts").toJSON(true)).toMatchInlineSnapshot(`
      {
        "name": "index.ts",
        "path": "/index.ts",
      }
    `);
  });
});
