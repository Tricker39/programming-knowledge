# 概念
> 本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

从 v4.0.0 开始，**webpack 可以不用再引入一个配置文件**来打包项目，然而，它仍然有着 `高度可配置性`，可以很好满足你的需求。

在开始前你需要先理解一些**核心概念**：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugin)
- 模式(mode)
- 浏览器兼容性(browser compatibility)
- 环境(environment)

## 参考资料

::: tip 参考资料

[webpack 官方中文文档](https://webpack.docschina.org/)

:::
