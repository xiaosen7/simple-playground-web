"use client";

import dynamic from "next/dynamic";
import ReactDOMClient from "react-dom/client";
import React, { useEffect, useState } from "react";
import * as xstate from "xstate";
import * as xstateReact from "@xstate/react";
import { project } from "@simple-playground-web/project";
import { Bundler } from "@simple-playground-web/bundler";
import {
  PlaygroundProvider,
  Loading,
  IPlaygroundContextValue,
} from "@simple-playground-web/react";
import { useMount } from "ahooks";
import { range } from "lodash-es";

const bundler = new Bundler(
  "https://www.unpkg.com/esbuild-wasm@0.20.2/esbuild.wasm"
);
const contextValue: IPlaygroundContextValue = { bundler };

const globalExternals = {
  "react-dom/client": ReactDOMClient,
  react: React,
  xstate,
  "@xstate/react": xstateReact,
};

const Playground = dynamic(
  () => import("@simple-playground-web/react").then((x) => x.Playground),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useMount(() => {
    fetch("/template.json")
      .then((res) => res.json())
      .then((files) => {
        Object.entries(files).forEach(([path, content]) => {
          project.writeFile(path, content as string);
        });
        console.log(`totally write ${Object.keys(files).length} files`);
      })
      .finally(() => setLoading(false));
  });

  return (
    <Loading className="h-full" tip="Loading files..." loading={loading}>
      <PlaygroundProvider value={contextValue}>
        <div className="h-full gap-4 grid grid-cols-2 grid-rows-2">
          {range(4).map((index) => {
            const id = index + 1;
            return (
              <Playground
                key={`playground-${id}`}
                entry="index.tsx"
                globalExternals={globalExternals}
                cwd={`/src/playgrounds/${id}`}
              />
            );
          })}
        </div>
      </PlaygroundProvider>
    </Loading>
  );
}
