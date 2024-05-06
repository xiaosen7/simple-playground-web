# simple-playground-web

## 项目说明

<!-- workspace packages descriptions start -->

| 包名 | 目录 | 描述 |
| :--- | :--- | :--- |
| @simple-playground-web/bundler | [./packages/bundler](packages/bundler/README.md) | The web bundler |
| @simple-playground-web/dom | [./packages/dom](packages/dom/README.md) | Dom utilities |
| @simple-playground-web/logger | [./packages/logger](packages/logger/README.md) | Logger utilities |
| @simple-playground-web/path | [./packages/path](packages/path/README.md) | Path utilities |
| @simple-playground-web/project | [./packages/project](packages/project/README.md) | Project model |
| @simple-playground-web/react | [./packages/react](packages/react/README.md) | The playground ui library of react framework |
| @simple-playground-web/types | [./packages/types](packages/types/README.md) | Common types |
| @simple-playground-web/ui | [./packages/ui](packages/ui/README.md) | UI models |
| @simple-playground-web/scripts | [./scripts](scripts/README.md) | Internal scripts |
| template | [./template](template/README.md) | Template of website |
| website | [./website](website/README.md) | Website |

<!-- workspace packages descriptions end -->

## 脚本说明

<!-- package scripts descriptions start-->

| 命令 | 描述 | 内容 | 运行方法 |
| :--- | :--- | :--- | :--- |
| release | 发布 | `scripts release` | `pnpm -w run release` |
| template | 生成 template.json | `scripts template` | `pnpm -w run template` |
| test | 测试 | `vitest` | `pnpm -w run test` |
| dev | 开发模式 | `pnpm --filter=website dev` | `pnpm -w run dev` |
| postinstall | 安装后执行的脚本 | `husky install` | `pnpm -w run postinstall` |

<!-- package scripts descriptions end-->

    
    
    