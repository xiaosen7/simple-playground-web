import {
  appendScript,
  appendScriptSrc,
  appendStylesheet,
  createNode,
} from "@simple-playground-web/dom";
import { ISafeAny } from "@simple-playground-web/types";
import { Subject } from "rxjs";

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

  state$ = new Subject<EState>();
  error$ = new Subject<string>();

  #iframe = createNode(
    `<iframe style="border: none; width: 100%; height: 100%"></iframe>`
  ) as HTMLIFrameElement;
  #window: Window | null = null; // If this.#window is null, it means the iframe hasn't loaded yet.
  // #toolbarContainer = createNode(
  //   `<div style="height: 30px; background: aliceblue" id="toolbar"></div>`
  // ) as HTMLDivElement;

  constructor() {
    this.state$.next(EState.Loading);
    this.#iframe.addEventListener("load", () => {
      this.state$.next(EState.Loaded);
      this.#window = this.#iframe.contentWindow;
      this.#loadSources();
    });
  }

  #loadSources = () => {
    if (!this.#window) {
      return;
    }

    // 错误处理
    this.#window.addEventListener("error", (ev) => {
      this.error$.next(ev.message);
    });
    this.#window.addEventListener("unhandledrejection", (ev) => {
      this.error$.next(`Unhandledrejection:\n${ev.reason}`);
    });

    const body = this.#window.document.body;

    // 解决全屏后背景色为黑色
    body.style.backgroundColor = "white";

    // toolbar
    // this.#iframe.contentWindow!.document.body.append(this.#toolbarContainer);
    // ReactDOM.render(
    //   <Toolbar
    //     key={uniqueId()}
    //     onFullscreen={() => this.#iframe.requestFullscreen()}
    //     onReload={() => window.location.reload()}
    //     headerElement={window.document.head}
    //   />,
    //   this.#toolbarContainer,
    // );

    // sources

    const { globals, scripts, styles, html } = this.#sources;

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
        element.textContent = content;
      } else {
        element = appendStylesheet(style.content, body);
        element.setAttribute("data-style-id", id);
        this.#sourceReferences.styles.set(id, element);
      }
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
    this.#iframe.remove();
  };

  requestFullscreen = () => {
    if (!this.#iframe.isConnected) {
      return;
    }

    return this.#iframe.requestFullscreen();
  };
}