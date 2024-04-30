import {
  appendScript,
  appendScriptSrc,
  appendStylesheet,
  createNode,
} from "@simple-playground-web/dom";
import { ISafeAny } from "@simple-playground-web/types";

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

export class Previewer {
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

  /**
   * 预览容器
   */
  #iframe = createNode(
    `<iframe style="border: none; width: 100%; height: 100%"></iframe>`
  ) as HTMLIFrameElement;
  #errorContainer = createNode(
    `<div style="color: red; position: fixed; left: 0; right: 0; top: 0; bottom: 0; background: rgba(0, 0, 0, 0.75); padding: 20px; overflow: auto"></div>`
  ) as HTMLDivElement;
  // #toolbarContainer = createNode(
  //   `<div style="height: 30px; background: aliceblue" id="toolbar"></div>`
  // ) as HTMLDivElement;

  constructor() {
    this.#iframe.addEventListener("load", () => {
      console.log("iframe loaded");

      this.#renderHtml();

      // 错误处理
      const iframeWindow = this.#iframe.contentWindow!;
      iframeWindow.addEventListener("error", (ev) => {
        this.#showError(`Error:\n${ev.message}`);
      });
      iframeWindow.addEventListener("unhandledrejection", (ev) => {
        this.#showError(`Unhandledrejection:\n${ev.reason}`);
      });
    });
  }

  #renderHtml = () => {
    const window = this.#iframe.contentWindow;
    if (!window) {
      return;
    }

    const body = window.document.body;

    // 解决全屏后背景色为黑色
    body.style.backgroundColor = "white";

    // error
    this.#errorContainer.remove();

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
      delete window[key as ISafeAny];
    });
    Object.entries(globals).forEach(([key, value]) => {
      window[key as ISafeAny] = value;
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

  updateSources = (sources: Partial<ISources>) => {
    this.#sources = {
      ...this.#sources,
      ...sources,
    };
    this.#renderHtml();
  };

  render = (container: HTMLElement) => {
    container.append(this.#iframe);
  };

  #showError = (msg: string) => {
    console.error(msg);
    if (
      msg.includes(
        "ResizeObserver loop completed with undelivered notifications"
      )
    ) {
      // 忽略这个错误
      return;
    }
    this.#errorContainer.innerText = msg;
    this.#iframe.contentWindow?.document.body.append(this.#errorContainer);
  };

  dispose = () => {
    this.#iframe.remove();
  };
}
