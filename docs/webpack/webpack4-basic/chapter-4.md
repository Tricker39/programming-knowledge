# 第 4 章 Webpack 生产环境的基本配置

## 4.1 提取 css 成单独文件

1.创建样式文件

2.下载插件 mini-css-extract-plugin

```bash
npm install mini-css-extract-plugin -D
```

3.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: './bundlt.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
  ],
};
```

4.运行指令

```bash
npx webpack
```

## 4.2 css 兼容性处理

1.创建样式文件

2.下载 loader

```bash
npm install postcss-loader postcss-preset-env -D
```

3.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => require('postcss-preset-env')(),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
  ],
};
```

4.修改 package.json 文件

```json
{
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
```

5.运行指令

```bash
npx webpack
```

## 4.3 压缩 css

1.创建样式文件

2.下载插件 optimize-css-assets-webpack-plugin

```bash
npm install optimize-css-assets-webpack-plugin -D
```

3.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => require('postcss-preset-env')(),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin(),
  ],
};
```

4.运行指令

```bash
npx webpack
```

## 4.4 js 语法检查

1.创建文件

2.下载安装包

```bash
npm install eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D
```

3.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => require('postcss-preset-env')(),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin(),
  ],
};
```

4.修改 package.json

```json
{
  "eslintConfig": {
    "extends": "airbnb-base",
    "env": {
      "browser": true,
      "node": true
    }
  }
}
```

5.运行指令

```bash
npx webpack
```

## 4.5 js 兼容性处理

1.创建文件

2.下载安装包

```bash
npm install babel-loader @babel/core @babel/preset-env @babel/polyfill core-js -D
```

3.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => require('postcss-preset-env')(),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: {
                version: 3,
              },
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17',
              },
            },
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin(),
  ],
};
```

4.运行指令

```bash
npx webpack
```

## 4.6 js 压缩

1.创建文件

2.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: './bundlt.js',
    path: path.resolve(__dirname, 'build'),
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

## 4.7 HTML 压缩

1.创建文件

2.修改 webpack.config.js 配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: './bundlt.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
```

3.运行指令

```bash
npx webpack
```

## 4.8 生产环境配置

1.创建文件

2.修改 webpack.config.js 配置文件

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: () => require('postcss-preset-env')(),
      },
    },
  },
];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'assets/js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' },
              },
            ],
          ],
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name]-[hash:8].[ext]',
          outputPath: 'assets/images',
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(js|css|less|html|png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:8].[ext]',
          outputPath: 'assets/media',
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[hash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'production',
};
```

3.运行指令

```bash
npx webpack
```
