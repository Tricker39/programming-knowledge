# 第 2 章 Webpack 的初体验

## 2.1 初始化配置

1. 初始化 package.json

```bash
npm init
```

2. 下载并安装 webpack

```bash
// 全局安装
npm install webpack webpack-cli -g
// 局部安装
npm install webpack webpack-cli -D
```

## 2.2 编译打包应用

1. 创建文件

2. 运行指令

   开发环境指令：

   ```bash
   webpack src/index.js -o build/built.js --mode development
   ```

   功能：webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成浏览器能识别的语法。

   生产环境指令：

   ```bash
   webpack src/index.js -o build/built.js --mode production
   ```

   功能：在开发配置功能上多一个功能，压缩代码。

3. 结论

   webpack 能够编译打包 js 和 json 文件。
   能将 es6 的模块化语法转换成浏览器能识别的语法。
   能压缩代码。

4. 问题

   不能编译 css、img 等文件。
   不能将 js 的 es6 基本语法转化为 es5 一下语法。
