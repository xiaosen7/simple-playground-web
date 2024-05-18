import { useContext } from "react";
import { PlaygroundContext } from "../context";

export function usePlayground() {
  const playground = useContext(PlaygroundContext);

  if (!playground) {
    throw new Error(`usePlayground must be used within a PlaygroundProvider`);
  }

  return playground;
}
