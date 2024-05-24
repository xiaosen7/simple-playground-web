# simple-playground-web

A web playground library can be used without server api.

## Packages

<!-- workspace packages descriptions start -->

| Package name                        | Path                                                                 | Description                                             |
| :---------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------------ |
| @simple-playground-web/storybook    | [./.storybook](.storybook/README.md)                                 |                                                         |
| with-react                          | [./examples/with-react](examples/with-react/README.md)               |                                                         |
| @simple-playground-web/bundler      | [./packages/cores/bundler](packages/cores/bundler/README.md)         | The web bundler                                         |
| @simple-playground-web/core         | [./packages/cores/core](packages/cores/core/README.md)               | Core models                                             |
| @simple-playground-web/fs           | [./packages/cores/fs](packages/cores/fs/README.md)                   | File system implementation in web                       |
| @simple-playground-web/playground   | [./packages/cores/playground](packages/cores/playground/README.md)   | Playground model                                        |
| @simple-playground-web/project      | [./packages/cores/project](packages/cores/project/README.md)         | Project model                                           |
| @simple-playground-web/react        | [./packages/frameworks/react](packages/frameworks/react/README.md)   | The playground ui library of react framework            |
| @simple-playground-web/dts-rollup   | [./packages/libs/dts-rollup](packages/libs/dts-rollup/README.md)     | Collect all referenced _.d.ts files of _.ts entry files |
| @simple-playground-web/gen-template | [./packages/libs/gen-template](packages/libs/gen-template/README.md) | Cli for generating template.json from a directory       |
| @simple-playground-web/renderers    | [./packages/renderers](packages/renderers/README.md)                 | Renderers                                               |
| @simple-playground-web/dom          | [./packages/utilities/dom](packages/utilities/dom/README.md)         | Dom utilities                                           |
| @simple-playground-web/logger       | [./packages/utilities/logger](packages/utilities/logger/README.md)   | Logger utilities                                        |
| @simple-playground-web/path         | [./packages/utilities/path](packages/utilities/path/README.md)       | Path utilities for browser                              |
| @simple-playground-web/types        | [./packages/utilities/types](packages/utilities/types/README.md)     | Common types                                            |
| @simple-playground-web/scripts      | [./scripts](scripts/README.md)                                       | Internal scripts                                        |
| template                            | [./template](template/README.md)                                     | Template of website                                     |

<!-- workspace packages descriptions end -->

## Scripts

<!-- package scripts descriptions start-->

| 命令        | 描述                      | 内容                          | 运行方法                  |
| :---------- | :------------------------ | :---------------------------- | :------------------------ |
| release     | 发布                      | `scripts release`             | `pnpm -w run release`     |
| test        | 测试                      | `vitest`                      | `pnpm -w run test`        |
| dev         | 开发模式                  | `pnpm --filter=website dev`   | `pnpm -w run dev`         |
| postinstall | 安装后执行的脚本          | `husky install`               | `pnpm -w run postinstall` |
| storybook   | 启动 storybook 开发服务器 | `pnpm --filter=storybook dev` | `pnpm -w run storybook`   |

<!-- package scripts descriptions end-->

## Frameworks

You can see `examples` folder for more info.

### React

Installation

```bash
npm i @simple-playground-web/core @simple-playground-web/react
```

Usage

```tsx
import { project } from "@simple-playground-web/core";
import { Playground } from "@simple-playground-web/react";
import "@simple-playground-web/react/dist/index.css";

project.setTemplate({
  files: {
    "/index.ts": "console.log('hello world');",
  },
  externals: {
    cjsCode: "",
  },
});

<Playground cwd="/" />;
```
