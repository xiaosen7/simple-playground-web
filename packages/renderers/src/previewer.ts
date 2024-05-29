import {
  appendScript,
  appendScriptSrc,
  appendStylesheet,
  createNode,
} from "@simple-playground-web/dom";
import { ISafeAny } from "@simple-playground-web/types";
import { Observable, Subject, Subscription, fromEvent } from "rxjs";
import { createConsole } from "./console";
import { Logger } from "@simple-playground-web/logger";

/**
 * 预览的可以改变资源，代码，全局变量
 */
interface ISources {
  scripts: Array<{ type?: string; id: string; content?: string; src?: string }>;
  styles: Array<{ id: string; content: string }>;
  globals: Record<string, ISafeAny>;
  html: string;
}

/**
 * 预览资源的引用，在改变时需要删除原来的
 */
interface ISourceReferences {
  scripts: Map<string, HTMLScriptElement>;
  styles: Map<string, HTMLStyleElement>;
  globals: Record<string, ISafeAny>;
  html: HTMLElement;
}

enum EState {
  Loading,
  Loaded,
}

export class Previewer {
  static EState = EState;

  EState = EState;
  console = createConsole();

  state$ = new Subject<EState>();
  error$ = new Subject<string>();
  load$: Observable<Event>;
  fullscreenChange$: Observable<Event>;

  #iframe = createNode(
    `<iframe style="border: none; width: 100%; height: 100%"></iframe>`
  ) as HTMLIFrameElement;
  #window: Window | null = null; // If this.#window is null, it means the iframe hasn't loaded yet.
  #logger = new Logger("previewer");

  #sources: ISources = {
    scripts: [],
    styles: [],
    globals: {},
    html: '<div id="root"></div>',
  };

  #sourceReferences: ISourceReferences = {
    scripts: new Map(),
    styles: new Map(),
    globals: {},
    html: createNode("<div id='root'></div>") as HTMLElement,
  };

  #subscription = new Subscription();

  constructor() {
    this.state$.next(EState.Loading);
    this.load$ = fromEvent(this.#iframe, "load");

    this.#subscription.add(
      this.load$.subscribe(() => {
        this.state$.next(EState.Loaded);
        this.#window = this.#iframe.contentWindow;
        this.#loadSources();
      })
    );

    this.fullscreenChange$ = fromEvent(this.#iframe, "fullscreenchange");
  }

  #loadSources = () => {
    if (!this.#window) {
      return;
    }

    this.#logger.log("loadSources", { sources: this.#sources });

    // @ts-ignore
    this.#window.console = this.console;

    // 错误处理
    this.#window.addEventListener("error", (ev) => {
      this.error$.next(ev.message);
    });
    this.#window.addEventListener("unhandledrejection", (ev) => {
      this.error$.next(`Unhandledrejection:\n${ev.reason}`);
    });

    // 解决全屏后背景色是黑色的问题
    const head = this.#window.document.head;
    const defaultStyle = document.createElement("style");
    defaultStyle.textContent = `body { background-color: white; }`;
    head.append(defaultStyle);

    const body = this.#window.document.body;

    // sources

    const { globals, scripts, styles, html } = this.#sources;
    this.#logger.log({ globals });

    // html
    this.#sourceReferences.html.remove();
    if (html) {
      const node = createNode(html);
      body.append(node);
      this.#sourceReferences.html = node as HTMLElement;
    }

    // globals
    Object.keys(this.#sourceReferences.globals).forEach((key) => {
      delete this.#window![key as ISafeAny];
    });
    Object.entries(globals).forEach(([key, value]) => {
      this.#window![key as ISafeAny] = value;
    });
    this.#sourceReferences.globals = globals;

    // styles
    styles.forEach((style) => {
      const { id, content } = style;
      let element = this.#sourceReferences.styles.get(id);
      if (element) {
        element.remove();
      }

      element = appendStylesheet(content, body);
      element.setAttribute("data-style-id", id);
      this.#sourceReferences.styles.set(id, element);
    });

    // scripts
    scripts.forEach((script) => {
      const { id, content, type, src } = script;

      let element = this.#sourceReferences.scripts.get(id);
      if (element) {
        // 动态改变 textContent 不会被执行
        element.remove();
      }

      if (src) {
        element = appendScriptSrc(src, type, body);
      } else if (content) {
        element = appendScript(content, type, body);
      } else {
        throw new Error("script must have src or content");
      }

      element.setAttribute("data-script-id", id);
      this.#sourceReferences.scripts.set(id, element);
    });
  };

  reload() {
    this.state$.next(EState.Loading);
    this.#window?.location.reload();
  }

  updateSources = (sources: Partial<ISources>) => {
    this.#sources = {
      ...this.#sources,
      ...sources,
    };

    this.reload();
  };

  render = (container: HTMLElement) => {
    container.append(this.#iframe);
  };

  dispose = () => {
    this.#subscription.unsubscribe();
    this.#iframe.remove();
  };

  requestFullscreen = () => {
    if (!this.#iframe.isConnected) {
      return;
    }

    return this.#iframe.contentWindow?.document.documentElement.requestFullscreen();
  };
}
