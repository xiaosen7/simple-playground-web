const { join } = require("path");
const { findWorkspacePackages } = require("@pnpm/workspace.find-packages");

/** @type {import('tailwindcss').Config} */
module.exports = async () => {
  const content = (await findWorkspacePackages(join(__dirname, ".."))).map(
    (x) => join(`${x.dir}/src/**/*.{js,ts,jsx,tsx}`)
  );

  return {
    content,
    theme: {
      extend: {},
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    },
  };
};
