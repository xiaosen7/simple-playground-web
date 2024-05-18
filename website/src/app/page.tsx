"use client";

import dynamic from "next/dynamic";
import ReactDOMClient from "react-dom/client";
import React, { useEffect, useState } from "react";
import * as xstate from "xstate";
import * as xstateReact from "@xstate/react";
import { project, bundler } from "@simple-playground-web/core";
import { PlaygroundProvider } from "@simple-playground-web/react";
import { useMount } from "ahooks";
import { range, once } from "lodash-es";

bundler.setWasmUrl("https://www.unpkg.com/esbuild-wasm@0.20.2/esbuild.wasm");

const globalExternals = {
  "react-dom/client": ReactDOMClient,
  react: React,
  xstate,
  "@xstate/react": xstateReact,
};

// bundler.setGlobalExternals(globalExternals);

const Playground = dynamic(
  () => import("@simple-playground-web/react").then((x) => x.Playground),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

const writeFiles = once(() => {
  fetch("/template.json")
    .then((res) => res.json())
    .then((template) => {
      project.setTemplate(template);
    });
});

export default function Home() {
  useMount(() => {
    writeFiles();
  });

  return (
    <div className="h-full gap-4 grid grid-cols-2 grid-rows-2">
      {range(4).map((index) => {
        const id = index + 1;
        return (
          <Playground
            key={`playground-${id}`}
            entry="index.tsx"
            cwd={`/src/playgrounds/${id}`}
            buildInputPattern={["**/*", "/node_modules/**/*.js"]}
          />
        );
      })}

      {/* <Playground entry="index.tsx" cwd={`/src/playgrounds/1`} /> */}
    </div>
  );
}
