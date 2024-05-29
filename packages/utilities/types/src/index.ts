export interface IFileObject {
  path: string;
  content: string;
}

export interface IProjectTemplate {
  /**
   * file path to code
   *
   * @example
   *
   * {
   *    "src/index.ts": "console.log('hello world')"
   * }
   */
  files: Record<string, string>;
  externals?: {
    /**
     * commonjs code for externals
     *
     * @example
     *
     * "module.exports = { react: React }"
     */
    cjsCode?: string;

    /**
     * css code for externals
     *
     * @example
     *
     * "body { color: red; }"
     */
    cssCode?: string;
  };
}

export interface IImportMap {
  imports: Record<string, string>;
}
