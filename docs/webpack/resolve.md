# resolve 详解
> 这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。

## 基本用法

```javascript
const {resolve} = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称+目录）
    filename: 'js/[name].js',
    // 输出文件目录（将来搜易资源输出的公共目录）
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
       // loader 配置
      {
        test: /\.css$/,
        // 多个 loader 用 user
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名
    alias:{
      $css: resolve(__dirname, 'src/css'),
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json'],
    // 告诉 webpack 解析模块的路径
    modules:[resolve(__dirname, '../../node_modules'), 'node_modules']
  }
};
```
