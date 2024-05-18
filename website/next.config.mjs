import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
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
