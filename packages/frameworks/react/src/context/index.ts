import { Playground } from "@simple-playground-web/playground";
import { createContext } from "react";

export const PlaygroundContext = createContext<Playground | null>(null);
