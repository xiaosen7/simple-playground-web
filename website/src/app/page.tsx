"use client";

import dynamic from "next/dynamic";
import ReactDOMClient from "react-dom/client";
import React, { useEffect, useState } from "react";
import * as xstate from "xstate";
import * as xstateReact from "@xstate/react";

const globalExternals = {
  "react-dom/client": ReactDOMClient,
  react: React,
  xstate,
  "@xstate/react": xstateReact,
};

const Loading = () => <p>Loading...</p>;

const Playground = dynamic(
  () => import("@simple-playground-web/react").then((x) => x.Playground),
  {
    loading: Loading,
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
    return <Loading />;
  }

  return (
    <Playground
      wasmUrl={"https://www.unpkg.com/esbuild-wasm@0.20.2/esbuild.wasm"}
      buildInputPattern="/src/**/*"
      files={files}
      entry="/src/index.tsx"
      globalExternals={globalExternals}
    />
  );
}
