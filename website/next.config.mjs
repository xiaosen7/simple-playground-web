import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@simple-playground-web/bundler",
    "@simple-playground-web/project",
    "@simple-playground-web/ui",
  ],
  webpack: (config) => {
    // wasm
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });

    // monaco
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ["typescript", "javascript", "css", "json"],
        filename: "static/[name].worker.js",
      })
    );

    return config;
  },
};

export default nextConfig;
