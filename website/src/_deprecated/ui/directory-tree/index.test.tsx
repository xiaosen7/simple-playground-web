import { pathsToData } from ".";

describe("directory-tree", () => {
  test("pathsToData", () => {
    expect(pathsToData(["/a/b/c", "/a/b/d", "/a/b/e", "/a/b/f"]))
      .toMatchInlineSnapshot(`
      [
        {
          "children": [
            "/a",
          ],
          "id": 0,
          "metadata": undefined,
          "name": "",
          "parent": null,
        },
        {
          "children": [
            "/a/b",
          ],
          "id": "/a",
          "metadata": undefined,
          "name": "a",
          "parent": 0,
        },
        {
          "children": [
            "/a/b/c",
            "/a/b/d",
            "/a/b/e",
            "/a/b/f",
          ],
          "id": "/a/b",
          "metadata": undefined,
          "name": "b",
          "parent": "/a",
        },
        {
          "children": [],
          "id": "/a/b/c",
          "metadata": undefined,
          "name": "c",
          "parent": "/a/b",
        },
        {
          "children": [],
          "id": "/a/b/d",
          "metadata": undefined,
          "name": "d",
          "parent": "/a/b",
        },
        {
          "children": [],
          "id": "/a/b/e",
          "metadata": undefined,
          "name": "e",
          "parent": "/a/b",
        },
        {
          "children": [],
          "id": "/a/b/f",
          "metadata": undefined,
          "name": "f",
          "parent": "/a/b",
        },
      ]
    `);
  });
});
