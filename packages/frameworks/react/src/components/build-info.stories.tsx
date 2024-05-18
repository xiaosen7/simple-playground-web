import { Playground } from "@simple-playground-web/playground";
import { PlaygroundProvider, PlaygroundProviderBuilder } from "../provider";
import { BuildInfo } from "./build-info";
import React from "react";

export default {
  component: BuildInfo,
};

export const Base = () => (
  <PlaygroundProviderBuilder cwd="/src/playgrounds/1">
    <BuildInfo />
  </PlaygroundProviderBuilder>
);
