import React, { PropsWithChildren, ReactNode, useMemo } from "react";
import { PlaygroundContext } from "../context";
import {
  IPlaygroundOptions,
  Playground,
} from "@simple-playground-web/playground";

export const PlaygroundProvider = (
  props: PropsWithChildren<{
    value: Playground;
  }>
) => {
  return (
    <PlaygroundContext.Provider value={props.value}>
      {props.children}
    </PlaygroundContext.Provider>
  );
};

export interface IPlaygroundProviderBuilderProps extends IPlaygroundOptions {
  children?: ReactNode;
}
export const PlaygroundProviderBuilder = React.memo(
  (props: IPlaygroundProviderBuilderProps) => {
    const {
      entry,
      globalExternals,
      buildInputPattern,
      directoryTreePathsPattern,
      cwd,
      buildOptions,
      children,
    } = props;

    const playground = useMemo(
      () =>
        Playground.create({
          cwd,
          entry,
          globalExternals,
          buildInputPattern,
          buildOptions,
          directoryTreePathsPattern,
        }),
      [
        buildInputPattern,
        globalExternals,
        entry,
        buildOptions,
        directoryTreePathsPattern,
        cwd,
      ]
    );
    return <PlaygroundProvider value={playground} children={children} />;
  },
  (oldProps, newProps) => {
    const deepEqualKeys: Array<keyof IPlaygroundProviderBuilderProps> = [
      "globalExternals",
      "buildOptions",
      "children",
    ];

    return Object.keys(oldProps).every(
      // @ts-ignore
      (key: keyof IPlaygroundProviderBuilderProps) => {
        if (deepEqualKeys.includes(key)) {
          return oldProps[key] === newProps[key];
        }

        return JSON.stringify(oldProps[key]) === JSON.stringify(newProps[key]);
      }
    );
  }
);
