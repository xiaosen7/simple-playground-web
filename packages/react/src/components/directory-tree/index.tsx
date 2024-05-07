import React, { useEffect, useMemo, useState } from "react";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import TreeView, {
  INode,
  ITreeViewOnNodeSelectProps,
  flattenTree,
} from "react-accessible-treeview";
import { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";
import { useControllableValue, useMemoizedFn } from "ahooks";
import classnames from "classnames";

type ITree = Parameters<typeof flattenTree>[0];

export function DirectoryTree(props: {
  paths: string[];
  onFileSelect?: (path: string) => void;
  selectedFile?: string;
  defaultSelectedPath?: string;
  onCreate?: (path: string) => void;
  hideNodeModules?: boolean;
}) {
  const { paths, defaultSelectedPath, hideNodeModules } = props;
  const [_selectedFileId, onSelectFileChange] = useControllableValue(props, {
    defaultValue: props.defaultSelectedPath,
    defaultValuePropName: "defaultSelectedFile",
    valuePropName: "selectedFile",
    trigger: "onFileSelect",
  });
  const selectedFileId = _selectedFileId
    ? pathToId(_selectedFileId)
    : undefined;
  const [selectedId, setSelectedId] = useState<string | undefined>(
    selectedFileId
  );

  const onNodeSelect = useMemoizedFn(
    ({ element, isBranch }: ITreeViewOnNodeSelectProps) => {
      setSelectedId(element.id as string);
      if (!isBranch) {
        onSelectFileChange(element.id as string);
      }
    }
  );

  const [data, setData] = useState<INode<IFlatMetadata>[]>([]);
  const map = useMemo(() => new Map(data.map((x) => [x.id, x])), [data]);

  const defaultSelectedFileParent = defaultSelectedPath
    ? map.get(pathToId(defaultSelectedPath))?.parent
    : undefined;

  useEffect(() => {
    setData(pathsToData(paths));
  }, [paths, hideNodeModules]);

  if (data.length === 0) {
    return null;
  }

  return (
    <div>
      <TreeView
        key={data.length}
        data={data}
        defaultExpandedIds={
          defaultSelectedFileParent ? [defaultSelectedFileParent] : undefined
        }
        selectedIds={selectedFileId ? [selectedFileId] : undefined}
        onNodeSelect={onNodeSelect}
        aria-label="directory tree"
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          getNodeProps,
          isSelected,
          level,
        }) => (
          <div
            {...getNodeProps()}
            title={element.name}
            style={{
              paddingLeft: 16 + 16 * (level - 1),
              paddingRight: 16,
              display: "flex",
              alignItems: "center",
            }}
            className={classnames(
              "hover:bg-gray-800 cursor-pointer p-2 gap-2",
              isSelected && "!bg-blue-500"
            )}
          >
            {isBranch ? (
              <FolderIcon isOpen={isExpanded} />
            ) : (
              <FileIcon filename={element.name} />
            )}

            <span
              className="text-ellipsis overflow-hidden whitespace-nowrap"
              aria-label="name"
            >
              {element.name}
            </span>
          </div>
        )}
      />
    </div>
  );
}

const FolderIcon = ({ isOpen }: { isOpen: boolean }) =>
  isOpen ? (
    <FaRegFolderOpen color="e8a87c" className="icon" />
  ) : (
    <FaRegFolder color="e8a87c" className="icon" />
  );

const FileIcon = ({ filename }: { filename: string }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "tsx":
    case "ts":
    case "jsx":
    case "js":
      return <DiJavascript color="yellow" className="icon" />;
    case "css":
      return <DiCss3 color="turquoise" className="icon" />;
    case "json":
      return <FaList color="yellow" className="icon" />;
    case "npmignore":
      return <DiNpm color="red" className="icon" />;
    default:
      return null;
  }
};

export function pathsToData(paths: string[]): INode<IFlatMetadata>[] {
  const root: ITree = {
    children: [],
    name: "",
    id: "",
  };

  paths.forEach((filepath) => {
    const names = filepath.split("/").filter((x) => x !== "");
    names.reduce((parent, name) => {
      const foundNode = parent.children?.find((node) => node.name === name);
      if (foundNode) {
        return foundNode;
      }

      const id = pathToId(`${parent.id}/${name}`);
      const node: ITree = {
        name: name,
        id,
        children: [],
      };
      parent.children?.push(node);
      return node;
    }, root);
  });

  root.children = sortDirectoryTree(root.children ?? []);
  return flattenTree(root);
}

type ISortableTreeData = Array<{
  name: string;
  children?: ISortableTreeData;
}>;
export function sortDirectoryTree<T extends ISortableTreeData>(data: T): T {
  const newData = data.slice();

  newData.forEach((x) => {
    if (x.children && x.children?.length > 0) {
      x.children = sortDirectoryTree(x.children);
    }
  });

  const highPriorities: string[] = [
    "node_modules",
    "public",
    "src",
    "tsconfig.json",
  ];
  const lowPriorities: string[] = ["README.md", "package.json", "LICENSE"];
  return newData.sort((a, b) => {
    if (a.children && a.children?.length > 0) {
      return -1;
    }
    if (b.children && b.children?.length > 0) {
      return 1;
    }

    for (let i = 0; i < highPriorities.length; i++) {
      if (a.name === highPriorities[i]) {
        return -1;
      }
      if (b.name === highPriorities[i]) {
        return 1;
      }
    }

    for (let i = 0; i < lowPriorities.length; i++) {
      if (a.name === lowPriorities[i]) {
        return 1;
      }
      if (b.name === lowPriorities[i]) {
        return -1;
      }
    }
    return 0;
  }) as T;
}

function pathToId(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}
