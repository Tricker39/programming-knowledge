# 第 3 章 Webpack 开发环境的基本配置

## 3.1 创建配置文件

1.创建文件 webpack.config.js

2.配置内容如下：

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './bundlt.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'development',
};
```

3.运行指令

```bash
npx webpack
```

4.结论
此时功能与上一节一致

## 3.2 打包样式资源

1.创建 css、less 文件

2.下载安装 loader 包

```bash
npm install style-loader css-loader less-loader less -D
```

3.修改 webpack.config.js 配置文件

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: './bundlt.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
};
```

4.运行指令

```bash
npx webpack
```

## 3.3 打包 HTML 资源

1.创建 index.html 文件

2.下载安装 html-webpack-plugin 插件

```bash
npm install html-webpack-plugin -D
```

3.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: './bundlt.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
```

4.运行指令

```bash
npx webpack
```

## 3.4 打包图片资源

1.创建图片文件

2.下载安装 loader 包

```bash
npm install html-loader url-loader file-loader -D
```

3.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: './bundlt.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name]-[contenthash:8].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
```

4.运行指令

```bash
npx webpack
```

## 3.5 打包其他资源（字体、音频、视频等）

1.创建文件

2.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: './bundlt.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name]-[contenthash:8].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(js|jsx|ts|tsx|css|less|html|json|png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name]-[contenthash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
```

3.运行指令

```bash
npx webpack
```

## 3.6 devServer

1.创建文件

2.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: './bundlt.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name]-[contenthash:8].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(js|jsx|ts|tsx|css|less|html|json|png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name]-[contenthash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
  },
};
```

3.运行指令

```bash
npx webpack-dev-server
```
