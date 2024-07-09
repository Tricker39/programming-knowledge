# 第 1 章 Webpack 简介

## 1.1 Webpack 是什么？

> Webpack 是一种前端资源构建工具。一个静态模块打包器(module bundler)。在 Webpack 看来，前端所有资源文件(js、css、html、图片、字体等)都可以视为模块，这些模块会经过 loader 转换成浏览器可以识别的模块。它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

## 1.2 Webpack 五个核心概念

### 1.2.1 entry

入口(entry)指示 Webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

### 1.2.2 output

输出(output)指示 Webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

### 1.2.3 loader

loadder 让 Webpack 能够去处理哪些非 JavaScript 文件(Webpack 自身只能处理 JavaScript 和 Json 文件)。

### 1.2.4 plugins

插件(plugins)可以用于执行范围更广的任务。插件的范围包括：从打包优化和压缩，一直到重新定义环境中的变量等。

### 1.2.5 mode

模式(mode)指示 Webpack 使用哪种模式进行构建，可以是 development 或 production。

<table style="width:100%">
    <thead>
        <tr>
            <th>选项</th>
            <th>描述</th>
            <th>特点</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>development</td>
            <td>会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。</td>
            <td>能让代码本地调试运行的环境</td>
        </tr>
        <tr>
            <td>production</td>
            <td>会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin。</td>
            <td>能让代码优化上线运行的环境</td>
        </tr>
    </tbody>
</table>
