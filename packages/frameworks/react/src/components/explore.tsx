import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useControllableValue, useMemoizedFn, useUpdate } from "ahooks";
import classNames from "classnames";
import { dirname, extname, join } from "@simple-playground-web/path";
import { TreeItem } from "@mui/x-tree-view";
import { VscFolder, VscFolderOpened, VscFile } from "react-icons/vsc";
import { usePlayground } from "../hooks/playground";
import { useObservable, useSubs } from "../hooks";
import { IComponentProps } from "./types";
import { debounceTime } from "rxjs";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import JavascriptIcon from "@mui/icons-material/Javascript";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import {
  unstable_useTreeItem2 as useTreeItem2,
  UseTreeItem2Parameters,
} from "@mui/x-tree-view/useTreeItem2";
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2GroupTransition,
  TreeItem2Label,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { SourceIcon } from "./source-icon";

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
}));

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { id, itemId, label, disabled, children, ...other } = props;
  const playground = usePlayground();

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <CustomTreeItemContent {...getContentProps()}>
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            {!playground.explore.isDirectory(itemId) && (
              <SourceIcon
                className="align-middle"
                width={16}
                extension={extname(itemId).slice(1)}
              />
            )}
            <TreeItem2Label {...getLabelProps()} />
          </Box>
        </CustomTreeItemContent>
        {children && (
          <TreeItem2GroupTransition {...getGroupTransitionProps()} />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

interface ITreeItem {
  children?: ITreeItem[];
  name: string;
  path: string;
}

export interface IDirectoryTreeProps extends IComponentProps {}
export function Explore(props: IDirectoryTreeProps) {
  const { className, style } = props;
  const playground = usePlayground();

  const selectedPath = useObservable(playground.selectedPath$);

  const items =
    useObservable(playground.debouncedFs$, () => {
      return pathsToItems(
        playground.getDirectoryTreePaths(),
        (path) =>
          playground.explore.existsSync(path) &&
          playground.explore.isDirectory(path)
      );
    }) ?? [];

  return (
    <div
      className={classNames(className, "overflow-auto")}
      style={style}
      aria-label={"explorer"}
    >
      <RichTreeView
        slots={{
          item: CustomTreeItem,
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
