# loader 详解
> webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

## 基本用法

在更高层面，在 webpack 的配置中，loader 有两个属性：

- test 属性，识别出哪些文件会被转换。
- use 属性，定义出在进行转换时，应该使用哪个 loader。

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
      {
        test: /\.js$/,
        // 单个 loader 用 loader
        loader: 'eslint-loader',
        // 排除文件
        exclude: /node_modules/,
        // 只对 src 目录进行 lint 检查
        include: resolve(__dirname, 'src'),
        // enforce => pre: 优先执行 post: 延后执行
        enforce: 'pre',
        // 其他配置
        options: {}
      },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  }
};
```
