# entry 详解
> 入口起点(entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

## 单个入口语法 
用法：`entry: string`

webpack.config.js

```javascript
/*
 * string
 * 单入口
 * 打包形成一个 chunk，输出一个 bundle 文件
 * 输出 chunk 默认名称为 main
 */
module.exports = {
  entry: './src/index.js'
};
```


## 多入口语法
用法：`entry:Array<string> | {[entryChunkName: string]: string|Array<string>}`
```javascript
/*
 * array
 * 多入口
 * 所有入口文件最终只会形成一个 chunk，输出一个 bundle 文件
 *   --> 只有在 HMR 功能中让 html 热更新生效
 * 输出 chunk 默认名称为 main
 */
module.exports = {
  entry: ['./src/index.js', './src/index2.js'] // 多个入口文件最终都会打包到第一个入口文件的 chunk 中
};


/*
 * object
 * 多入口
 * 有几个入口文件，就会形成几个 chunk，输出几个 bundle 文件
 * 此时的 chunk 名称是 key
 */
module.exports = {
  entry: {
    index: './src/index.js', 
    index2: './src/index2.js'
  }
};
```
