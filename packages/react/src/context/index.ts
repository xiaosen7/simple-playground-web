import { Bundler } from "@simple-playground-web/bundler";
import { createContext } from "react";

export interface IPlaygroundContextValue {
  bundler: Bundler;
}
export const PlaygroundContext = createContext<IPlaygroundContextValue>(null);
