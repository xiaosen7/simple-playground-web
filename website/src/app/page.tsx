"use client";

import dynamic from "next/dynamic";
import ReactDOMClient from "react-dom/client";
import React, { useEffect, useState } from "react";
import wasmUrl from "esbuild-wasm/esbuild.wasm";

const globals = {
  "react-dom/client": ReactDOMClient,
  react: React,
};

const DynamicPlayground = dynamic(
  () => import("@simple-playground-web/react").then((x) => x.Playground),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export default function Home() {
  const [files, setFiles] = useState<Record<string, string>>();

  useEffect(() => {
    fetch("/template.json")
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  if (!files) {
    return <>Loading...</>;
  }

  return (
    <DynamicPlayground
      wasmUrl={wasmUrl}
      buildInput="/src/**/*"
      files={files}
      entry="/src/index.tsx"
      globalExternals={globals}
    />
  );
}
