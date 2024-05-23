import { kebabCase } from "change-case";

type IAnyFunction = IFunction;
type IFunction<P extends any[] = any, R extends any = any> = (...args: P) => R;

interface IConfig {
  log: boolean;
  time: boolean;
}
const DEFAULT_CONFIG = {
  log: true,
  time: true,
} as const satisfies IConfig;
export class Logger {
  static #config: IConfig = DEFAULT_CONFIG;

  static setConfig(config: Partial<IConfig>) {
    Logger.#config = {
      ...Logger.#config,
      ...config,
    };
  }

  constructor(private namespace: string) {}

  #getPrefix = () => `[${kebabCase(this.namespace)}]: `;

  log = (...args: any) => {
    if (!Logger.#config.log) return;
    console.log(this.#getPrefix(), ...args);
  };

  withAsyncFn = <T extends IAnyFunction>(fn: T, name: string = fn.name): T => {
    const timeLabel = `${this.#getPrefix()}: ${name}`;
    console.time(timeLabel);

    return afterFnAsync(fn, (result, args) => {
      this.log("fn: ", name, "args:", args, "result: ", result);
      console.timeEnd(timeLabel);
    }) as T;
  };

  withAsyncFnIgnoreError = <T extends IAnyFunction>(fn: T): T =>
    afterFnAsync(
      (...args) => Promise.resolve(fn(...args)).catch((error) => error),
      (result, args) =>
        this.log("fn: ", fn.name, "args:", args, "result: ", result)
    ) as T;

  withFn = <T extends IAnyFunction>(fn: T): T =>
    afterRun(fn, (result, args) =>
      this.log("fn: ", fn.name, "args:", args, "result: ", result)
    ) as T;

  time = (label: string) => {
    if (!Logger.#config.time) return;
    console.time(`${this.#getPrefix()}: ${label}`);
  };

  timeEnd = (label: string) => {
    if (!Logger.#config.time) return;
    console.timeEnd(`${this.#getPrefix()}: ${label}`);
  };
}

/**
 * 返回一个函数，首先运行 fn(如果存在)，其次再运行 afterFn，afterFn 的第一个参数是第一个函数的结果, 第二个参数是调用返回函数的参数数组
 *
 * @param fn
 * @param afterFn
 * @returns
 */
function afterRun<
  P extends any[],
  R,
  TFn extends IFunction<P, R>,
  TAfterFn extends IFunction<[TFn extends undefined ? undefined : R, P], any>,
>(fn: IFunction<P, R> | undefined, afterFn: TAfterFn) {
  return (...args: P) => {
    const ret = fn?.(...args);
    // @ts-expect-error it's ok
    afterFn(ret, args);
    return ret;
  };
}

function afterFnAsync<
  P extends any[],
  R,
  TFn extends IFunction<P, R>,
  TAfterFn extends IFunction<[TFn extends undefined ? undefined : R, P], any>,
>(fn: IFunction<P, R> | undefined, afterFn: TAfterFn) {
  return async (...args: P) => {
    const ret = await fn?.(...args);
    // @ts-expect-error it's ok
    await afterFn(ret, args);
    return ret;
  };
}
