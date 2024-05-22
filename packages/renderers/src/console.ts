import { set } from "lodash-es";
import { ReplaySubject, Subject } from "rxjs";

export const CONSOLE_STREAM_NAMES = ["log", "error"] as const;

export type IConsoleStreamName = (typeof CONSOLE_STREAM_NAMES)[number];

type IConsole = Console & Record<`${IConsoleStreamName}$`, Subject<any[]>>;

export function createConsole() {
  const customConsole = Object.create(window.console);

  CONSOLE_STREAM_NAMES.reduce((memo, methodName) => {
    set(memo, `${methodName}$`, new ReplaySubject<any[]>());

    set(memo, methodName, (...args: any[]) => {
      memo[`${methodName}$`].next(args);
      window.console[methodName];
    });

    return memo;
  }, customConsole);

  return customConsole as IConsole;
}
