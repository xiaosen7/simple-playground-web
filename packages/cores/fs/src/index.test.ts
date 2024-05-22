// import { FS } from ".";
import { FS } from ".";

import fs from "fs";

// const watcher = fs.watch("/src", (ev, filename) => {
//   ev === "change";
//   ev === "rename";
// });

fs.cpSync;

describe("fs", () => {
  describe("writeFileSync", () => {
    test("should recursively create directory", () => {
      const fs = new FS();
      fs.writeFileSync("/a/test.txt", "hello");
      expect(fs.readFileSync("/a/test.txt", "utf8")).toBe("hello");
    });

    test("should support write empty string", () => {
      const fs = new FS();
      fs.writeFileSync("/empty.txt", "");
      expect(fs.readFileSync("/empty.txt", "utf8")).toBe("");
    });
  });

  describe("copyFileSync", () => {
    test("should copy file", () => {
      const fs = new FS();
      fs.writeFileSync("/test.txt", "hello");
      fs.copyFileSync("/test.txt", "/test2.txt");
      expect(fs.readFileSync("/test.txt", "utf8")).toBe("hello");
      expect(fs.readFileSync("/test2.txt", "utf8")).toBe("hello");
    });
  });

  describe("cpSync", () => {
    test("should throw error if src is not exists", () => {
      const fs = new FS();
      expect(() => fs.cpSync("/test.txt", "/test2.txt")).toThrowError(
        "no such file or directory"
      );
    });

    test("should throw error if src is not directory", () => {
      const fs = new FS();
      fs.writeFileSync("/test.txt", "hello");
      expect(() => fs.cpSync("/test.txt", "/test2.txt")).toThrowError(
        "not a directory"
      );
    });

    test("should copy directory", () => {
      const fs = new FS();
      fs.mkdirpSync("/old-dir");
      fs.writeFileSync("/old-dir/test.txt", "hello");
      fs.cpSync("/old-dir", "/new-dir");
      expect(fs.existsSync("/new-dir")).toBe(true);
      expect(fs.readFileSync("/new-dir/test.txt", "utf8")).toBe("hello");
      expect(fs.readFileSync("/old-dir/test.txt", "utf8")).toBe("hello");
    });
  });

  describe("renameSync", () => {
    test("should throw error if not exist", () => {
      const fs = new FS();
      expect(() => fs.renameSync("/test.txt", "/test2.txt")).toThrowError(
        "no such file or directory"
      );
    });

    test("should rename file", () => {
      const fs = new FS();
      fs.writeFileSync("/test.txt", "hello");
      fs.renameSync("/test.txt", "/test2.txt");
      expect(fs.existsSync("/test.txt")).toBe(false);
      expect(fs.readFileSync("/test2.txt", "utf8")).toBe("hello");
    });

    test("should rename directory", () => {
      const fs = new FS();
      fs.mkdirpSync("/old-dir");
      fs.renameSync("/old-dir", "/new-dir");
      expect(fs.existsSync("/old-dir")).toBe(false);
      expect(fs.existsSync("/new-dir")).toBe(true);
    });

    test("should rename directory which is not empty", () => {
      const fs = new FS();
      fs.mkdirpSync("/old-dir");
      fs.writeFileSync("/old-dir/test.txt", "hello");
      fs.renameSync("/old-dir", "/new-dir");
      expect(fs.existsSync("/old-dir")).toBe(false);
      expect(fs.existsSync("/new-dir")).toBe(true);
      expect(fs.readFileSync("/new-dir/test.txt", "utf8")).toBe("hello");
    });
  });

  describe("watch", () => {
    describe("change", () => {
      test("writeFileSync", () => {
        return new Promise((end) => {
          const fs = new FS();
          const { close } = fs.watch("/", (type, filename) => {
            expect({ type, filename }).toMatchInlineSnapshot(`
              {
                "filename": "/test.txt",
                "type": "change",
              }
            `);

            close();
            fs.writeFileSync("/test2.txt", "hello");
            end(null);
          });
          fs.writeFileSync("/test.txt", "hello");
        });
      });
    });

    describe("rename", () => {
      test("renameSync", () => {
        return new Promise((end) => {
          const fs = new FS();
          const { close } = fs.watch("/", (type, filename, targetName) => {
            if (type !== "rename") {
              return;
            }

            expect({ type, filename, targetName }).toMatchInlineSnapshot(`
              {
                "filename": "/test.txt",
                "targetName": "/test2.txt",
                "type": "rename",
              }
            `);

            close();
            end(null);
          });
          fs.writeFileSync("/test.txt", "hello");
          fs.renameSync("/test.txt", "/test2.txt");
        });
      });
    });
  });

  describe("globSync", () => {
    test("should filter files", () => {
      const fs = new FS();
      fs.writeFileSync("/src/index.ts", "");
      fs.writeFileSync("/test.txt", "");
      const files = fs.globSync(["/src/**/*"]);
      expect(files).toEqual(["/src/index.ts"]);
    });

    test("should support patterns which are not absolute", () => {
      const fs = new FS();
      fs.writeFileSync("/src/index.ts", "");
      fs.writeFileSync("/test.txt", "");
      const files = fs.globSync(["/src/**/*"]);
      expect(files).toEqual(["/src/index.ts"]);
    });

    test("should support onlyFiles option", () => {
      const fs = new FS();
      fs.writeFileSync("/dir/src/index.ts", "");
      expect(fs.globSync(["**/*"], { onlyFiles: false })).toEqual([
        "/dir",
        "/dir/src",
        "/dir/src/index.ts",
      ]);
    });
  });
});
