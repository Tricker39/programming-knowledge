# output 详解
> output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。

## 基本用法

在 webpack 配置中，output 属性的最低要求是，将它的值设置为一个对象，然后为将输出文件的文件名配置为一个 output.filename：

```javascript
const {resolve} = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称+目录）
    filename: 'js/[name].js',
    // 输出文件目录（将来搜易资源输出的公共目录）
    path: resolve(__dirname, 'dist'),
    // 所有资源引入公共路径前缀（一般用于生产环境）
    publicPath: '/',
    // 非入口 chunk 的名称
    chunkFilename: 'js/[name]_chunk.js',
    // 整个库向外暴露的变量名 
    library: '[name]', 
    // 变量名添加到哪个对象上 browser,
    // libraryTarget: 'window',
    // 变量名添加到哪个对象上 node
    // libraryTarget: 'global',
    libraryTarget: 'commonjs'
  },
};
```
