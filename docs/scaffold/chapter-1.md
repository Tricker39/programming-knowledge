# 从零开始开发一个基于 Vue3 的开发模板（一）

## 动机

说起这个话题，其实有些难以启齿。本人一直在小公司混口饭吃，但是天有不测风云，小公司倒闭了，本人也只能卷铺盖走人。经历一番波折（年底前面试），发现市面上的公司开始渐渐都在使用 vue3 进行开发，以前的公司都在使用 vue2，而且在公司上班的时候都在做 CRUD 的工作，没有接触过前端开发框架的工作。基于学习的目的，本人决定自己搭建一个基于 vue3 的开发模板，以备后用。好了，闲话少说，让我们开始吧 ！

## 准备工作

我准备使用 vite 作为开发的基础，使用 pnpm 作为包管理器。

::: tip 兼容性注意

Vite 需要 [Node.js](https://nodejs.org/) 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

:::

我使用的 nodejs 版本是 `v20.13.1`。

> [!TIP] 推荐的 vscode 插件
>
> [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
>
> [别名路径跳转](https://marketplace.visualstudio.com/items?itemName=lihuiwang.vue-alias-skip)

## 搭建 Vite 项目

```bash:no-line-numbers
$ pnpm create vite
```

### 完整的目录结构

```:no-line-numbers
.
├─ .vscode
│ └─ extensions.json
├─ node_modules
├─ public
│ └─ vite.svg
├─ src
│ ├─ assets
│ │ └─ vue.svg
│ ├─ components
│ │ └─ HelloWorld.vue
│ ├─ main.ts
│ ├─ App.vue
│ ├─ style.css
│ └─ vite-env.d.ts
├─ .gitignore
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

### 运行项目

```bash:no-line-numbers
$ pnpm install
$ pnpm dev
```

看到这个界面就说明项目启动成功了。

[![项目预览](https://s21.ax1x.com/2024/06/01/pkGkNUf.md.png)](https://imgse.com/i/pkGkNUf)

## 项目配置

安装 `@types/node` 依赖

```bash:no-line-numbers
$ pnpm add @types/node -D
```

### 修改 `tsconfig.json` 文件

打开 `tsconfig.json` 文件，在 `compilerOptions` 下面添加以下配置。

```json:no-line-numbers
{
  "compilerOptions": {
    // ...
    "baseUrl": ".", // [!code ++]
    "paths": { // [!code ++]
      "@/*": ["src/*"] // [!code ++]
    } // [!code ++]
  },
  // ...
}
```

### 修改配置

打开根目录下的 `vite.config.ts` 文件，我们可以看到默认的配置，我们将进行简单的配置修改。

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // [!code ++]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // prettier-ignore
  resolve: { // [!code ++]
    alias: [ // [!code ++]
      { // [!code ++]
        find: '@', // [!code ++]
        replacement: path.resolve(__dirname, './src') , // [!code ++]
      }, // [!code ++]
    ], // [!code ++]
  }, // [!code ++]
  // prettier-ignore
  server: { // [!code ++]
    port: 3000, // [!code ++]
    strictPort: true, // [!code ++]
    open: true, // [!code ++]
  }, // [!code ++]
});
```

## 修改 `src/main.ts` 文件

将 `src/main.ts` 文件的内容替换为以下内容：

```ts
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

async function bootstrap() {
  const app = createApp(App);

  app.mount('#app', true);

  console.log('🚀 ~ bootstrap ~ vue3 app 加载完成！');
}

void bootstrap();
```

至此，我们已经完成了项目的基本配置。

## 参考资料

::: details 参考资料

[Vite 官方文档](https://cn.vitejs.dev/)

:::
