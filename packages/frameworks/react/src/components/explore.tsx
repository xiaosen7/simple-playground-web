import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useControllableValue, useMemoizedFn, useUpdate } from "ahooks";
import classNames from "classnames";
import { dirname, join } from "@simple-playground-web/path";
import { TreeItem } from "@mui/x-tree-view";
import { VscFolder, VscFolderOpened, VscFile } from "react-icons/vsc";
import { usePlayground } from "../hooks/playground";
import { useObservable } from "../hooks";
import { IComponentProps } from "./types";
import { debounceTime } from "rxjs";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SourceIcon from "@mui/icons-material/Source";

interface ITreeItem {
  children?: ITreeItem[];
  name: string;
  path: string;
}

export interface IDirectoryTreeProps extends IComponentProps {}
export function Explore(props: IDirectoryTreeProps) {
  const { className, style } = props;
  const playground = usePlayground();
  const paths = useObservable(playground.directoryTreePaths$) ?? [];
  const selectedPath = useObservable(playground.selectedPath$);

  const items = useMemo(
    () => pathsToItems(paths, (path) => playground.explore.isDirectory(path)),
    [paths]
  );

  return (
    <div
      className={classNames(className, "overflow-auto")}
      style={style}
      aria-label={"explorer"}
    >
      <RichTreeView
        slots={{
          collapseIcon: FolderIcon,
          expandIcon: FolderOpenIcon,
          endIcon: SourceIcon,
        }}
        getItemId={(x) => x.path}
        className="overflow-auto"
        items={items}
        onSelectedItemsChange={(_, path) => {
          path && path !== selectedPath && playground.selectedPath$.next(path);
        }}
        getItemLabel={(x) => x.name}
        defaultSelectedItems={playground.getEntryPathRelativeCwd()}
        defaultExpandedItems={[dirname(playground.getEntryPathRelativeCwd())]}
      />
    </div>
  );
}

function pathsToItems(
  paths: string[],
  isDirectory: (path: string) => boolean
): ITreeItem[] {
  interface IDirectoryInputMap {
    children: {
      [key: string]: IDirectoryInputMap;
    };
    name: string;
  }

  const rootMap = buildMap();

  return flat(rootMap, "").children ?? [];

  function buildMap() {
    const rootMap: IDirectoryInputMap = {
      children: {},
      name: "",
    };

    paths.forEach((filepath) => {
      const names = filepath.split("/").filter((x) => x !== "");
      names.reduce((parent: IDirectoryInputMap, name, index) => {
        const foundNode = parent.children[name];
        if (foundNode) {
          return foundNode as IDirectoryInputMap;
        }

        const node: IDirectoryInputMap = {
          name: name,
          children: {},
        };
        parent.children[name] = node;
        return node;
      }, rootMap);
    });

    return rootMap;
  }

  function flat(map: IDirectoryInputMap, parentPath: string) {
    const { children, name } = map;
    const path = join(parentPath, name);
    const ret: ITreeItem = {
      name,
      path,
    };

    if (isDirectory(path)) {
      ret.children = Object.keys(children).map((childName) => {
        const childMap = children[childName];
        return flat(childMap, path);
      });
    }

    return ret;
  }
}
