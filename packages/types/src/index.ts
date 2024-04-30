export type ISafeAny = any;

export interface IFileObject {
  path: string;
  content: string;
}

export interface IImportMap {
  imports: Record<string, string>;
}
export enum EPlaygroundStates {
  Start,
  // Compilation
  ProjectCompilationStarted,
  ProjectCompiling,
  ProjectCompiledSuccessfully,
  ProjectCompiledFailure,
}

export enum EPlaygroundActions {
  // Compilation
  StartProjectCompilation,
  ProjectCompiling,
  ProjectCompiledSuccessfully,
  ProjectCompiledFailure,
}

export interface IPlaygroundActionHandlers {
  // Compilation
  [EPlaygroundActions.StartProjectCompilation]: () => void;
  [EPlaygroundActions.ProjectCompiling]: () => void;
  [EPlaygroundActions.ProjectCompiledSuccessfully]: ({
    css,
    js,
  }: {
    css: string | undefined;
    js: string | undefined;
  }) => void;
  [EPlaygroundActions.ProjectCompiledFailure]: () => void;
}

export interface IStateMachine<
  S,
  ActionData extends Record<ISafeAny, ISafeAny>,
  A = keyof ActionData
> {
  register(
    from: S | S[],
    to: S,
    action: A | "auto",
    fn?: (data: ActionData[A]) => void
  ): void;
  dispatch(action: A, data: ActionData[A]): boolean;
  getState(): S;
  describe(
    title: string,
    cb: (register: IStateMachine<S, ActionData, A>["register"]) => void
  ): void;
}

// #region FS

export type IFileSystemData = string;

export type IFileSystemDBWatchHandler = (
  payload:
    | {
        eventType: EFileSystemEventsType.Remove;
        data: IFileSystemEventsData[EFileSystemEventsType.Remove];
      }
    | {
        eventType: EFileSystemEventsType.Write;
        data: IFileSystemEventsData[EFileSystemEventsType.Write];
      }
) => ISafeAny;

export interface IFileSystemDBWatcher {
  close(): void;
  handler: IFileSystemDBWatchHandler;
}
export interface IFileSystemDB {
  writeFile(filePath: string, data: IFileSystemData): Promise<void>;
  readFile(filePath: string): Promise<IFileSystemData | null>;
  rm(filePath: string): Promise<void>;
  readDir(path: string): Promise<string[]>;
  move(from: string, to: string): Promise<void>;
  watch(path: string, handler: IFileSystemDBWatchHandler): IFileSystemDBWatcher;
}

export interface IFileSystem extends IFileSystemDB {
  join(...paths: string[]): string;
  isFile(path: string): Promise<boolean>;
  isDirectory(path: string): Promise<boolean>;
}

export enum EFileSystemEventsType {
  Remove,
  Write,
}

export interface IFileSystemEventsData {
  [EFileSystemEventsType.Remove]: {
    filePath: string;
  };
  [EFileSystemEventsType.Write]: {
    filePath: string;
    content: IFileSystemData;
  };
}

// #endregion FS
