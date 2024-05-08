import React, { PropsWithChildren } from "react";
import { IPlaygroundContextValue, PlaygroundContext } from "../context";

export const PlaygroundProvider = (
  props: PropsWithChildren<{
    value: IPlaygroundContextValue;
  }>
) => {
  return (
    <PlaygroundContext.Provider value={props.value}>
      {props.children}
    </PlaygroundContext.Provider>
  );
};
