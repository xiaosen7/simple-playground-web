import { FileTypeClassifier, IFileType } from "./file-extension-classifier";

describe("file-extension-classifier", () => {
  describe("extensions", () => {
    const doTest = (extension: IFileType) => {
      test(`.${extension}`, () => {
        const classifier = new FileTypeClassifier();
        classifier.addFile(`index.${extension}`);
        expect(classifier.getFiles([extension])).toMatchInlineSnapshot(`
        [
          "index.${extension}",
        ]
      `);
      });
    };

    doTest("d.ts");
    doTest("ts");
    doTest("jsx");
    doTest("js");
    doTest("jsx");
    doTest("json");
  });

  test("has", () => {
    const classifier = new FileTypeClassifier();
    classifier.addFile(`index.ts`);
    expect(classifier.has(`index.ts`)).toBe(true);
    expect(classifier.has(`index.js`)).toBe(false);
  });

  test("remove", () => {
    const classifier = new FileTypeClassifier();
    classifier.addFile(`index.ts`);
    classifier.remove(`index.ts`);
    expect(classifier.has(`index.ts`)).toBe(false);
  });
});
