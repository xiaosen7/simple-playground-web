import { join } from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    join(
      __dirname,
      "..",
      "packages",
      "frameworks",
      "react",
      "src/**/*.{js,ts,jsx,tsx,mdx}"
    ),
  ],
  plugins: [],
};
export default config;
