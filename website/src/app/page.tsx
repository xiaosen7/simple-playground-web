"use client";

import dynamic from "next/dynamic";
import ReactDOMClient from "react-dom/client";
import React, { useEffect, useState } from "react";

const globals = {
  "react-dom/client": ReactDOMClient,
  react: React,
};

const DynamicPlayground = dynamic(
  () => import("@/ui/playground").then((x) => x.UIPlayground),
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
      buildInput="/src/**/*"
      files={files}
      entry="src/index.tsx"
      globalExternals={globals}
    />
  );
}
