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
  externals: {
    /**
     * commonjs code for globals
     *
     * @example
     *
     * "module.exports = { react: React }"
     */
    cjsCode: string;
  };
}
