# 第 5 章 Webpack 优化配置

## 5.1 HMR

1.创建文件

2.修改 webpack.config.js 文件

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|bmp)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name]-[hash:8].[ext]',
          outputPath: 'images',
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(js|css|html|less|png|jpg|jpeg|gif|bmp)$/,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:8].[ext]',
          outputPath: 'medias',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启 HMR 功能
    hot: true,
  },
};
```

3.修改 js 文件

```js
if (module.hot) {
  module.hot.accept('xxx.js', () => {
    // do something hmr here
    console.log('执行 HRM 代码');
  });
}
```

4.运行指令

```bash
npx webpack
```

## 5.2 source-map

1.创建文件

2.修改 webpack.config.js 配置文件

```js
/*
  HMR: hot module replacement 热模块替换/模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块，而不是打包所有模块
      极大提升构建速度
      样式文件：可以使用 HMR 实时更新样式，因为 style-loader 已经内置了 HMR 功能
      js 文件：默认没有 HMR 功能 --> 需要修改 js 代码，添加支持 HMR 功能的代码
        注意：HMR 功能对 js 文件的处理，只能处理非入口 js 文件的其他文件。
      html 文件：默认不支持 HMR，同时会导致问题：html 文件不能支持热更新（不需要热更新）
        解决方案：修改 entry 入口，将 html 文件 引入 entry
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack 配置
module.exports = {
  // 入口起点
  entry: ['./src/index.js', './src/index.html'],
  // 输出
  output: {
    // 输出的文件名
    filename: 'js/built.js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的 loader 配置
      {
        // 处理 less 资源
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        // 处理 css 资源
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // 处理图片资源
        test: /\.(png|jpg|jpeg|gif|bmp)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name]-[hash:8].[ext]',
          outputPath: 'images',
          // 关闭 es 6 模块化
          esModule: false,
        },
      },
      {
        // 处理 html 中的图片资源
        test: /\.html$/,
        loader: 'html-loader',
      },
      // 打包其他资源 (除了 js、css、html 资源)
      {
        // 排除 js、css、html 以外的资源
        exclude: /\.(js|css|html|less|png|jpg|jpeg|gif|bmp)$/,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:8].[ext]',
          outputPath: 'medias',
        },
      },
    ],
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
    }),
  ],
  // 开发模式 'development' | 'production'
  mode: 'development',
  // 开发服务器 devServer：用来自动化（自动编译、自动打开浏览器、自动刷新浏览器）
  // 特点：只会在内存中打包，不会有任何输出
  // 启动 devServer 指令为：npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启用 gzip 压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 开启 HMR 功能
    // 注意：当修改了 webpack 配置，需要重启 devServer
    hot: true,
  },
  devtool: 'eval-source-map',
};
/*
  source-map：一种提供源代码到构建后代码映射的技术（如果构建后代码出错了，通过映射可以追踪源代码的错误）
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map: 外部
      错误代码的准确信息和源代码的错误位置
    inline-source-map: 内联
      只生成一个内联 source-map
      错误代码的准确信息和源代码的错误位置
    hidden-source-map: 外部
      错误代码的错误原因，但是没有错误位置
      不能追踪源代码的错误，只能提示到构建后代码的错误位置
    eval-source-map: 内联
      每个文件都生成一个内联 source-map，都在 eval 
      错误代码的准确信息和源代码的错误位置，错误文件文件名多了 hash 值
    nosources-source-map: 外部
      错误代码的准确信息，但是没有任何源代码的错误信息
    cheap-source-map: 外部
      错误代码的准确信息和源代码的错误位置
      只能精确到行
    cheap-module-source-map: 外部
      错误代码的准确信息和源代码的错误位置
      module 会将 loader 的 source map 加入

    内联与外部的区别：
      1.外部生成文件，内联没有
      2.内联构建速度更快

    开发环境：速度快，调试更友好
      速度快(eval > inline > cheap > ...)
        eval-cheap-source-map
        eval-source-map
      调试更友好
        source-map
        cheap-module-source-map
        cheap-source-map
      
      --> eval-source-map / eval-cheap-module-source-map

    生产环境：源代码是否隐藏？调试是否友好
      内联会让代码体积变大，所以在生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

      --> source-map / cheap-module-source-map
*/
```

3.运行指令

```bash
npx webpack
```

## 5.3 oneOf

1.创建文件

2.修改 webpack.config.js 文件

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置 node 环境变量: 决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// 复用 loader 配置
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        // postcss 配置
        plugins: [
          // postcss-preset-env 插件
          require('postcss-preset-env')(),
        ],
      },
    },
  },
];

// webpack 配置
module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出的文件名
    filename: 'assets/js/built.js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的 loader 配置
      /*
        正常来讲，一个文件只能被一个 loader 处理
        当一个文件被多个 loader 处理时，那么一定要指定 loader 的执行顺序:
          先执行 eslint 再处理 babel
      */
      {
        // 在 package.json 中配置 eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 优先执行
        enforce: 'pre',
        options: {
          // 自动修复
          fix: true,
        },
      },
      {
        // 一下 loader 只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
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
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  // 基本语法兼容
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定 corejs 的版本
                    corejs: { version: 3 },
                    // 指定兼容性做到哪个版本浏览器
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
    ],
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩 html 文件
      minify: {
        // 压缩 html 文件
        removeComments: true, // 移除 HTML 注释
        collapseWhitespace: true, // 移除空格
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[hash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  // 开发模式 'development' | 'production'
  // 生产环境下，会自动压缩 js 代码
  mode: 'production',
};
```

3.运行指令

```bash
npx webpack
```

## 5.4 缓存

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  缓存：
    babel 缓存：
      cacheDirectory: true
      --> 第二次打包速度更快
    文件资源缓存：
      hash: 每次 webpack 构建都会生成一个唯一的 hash 值。
        问题：因为 js 和 css 同时使用一个 hash 值，如果重新打包，会导致所有缓存失效（可能只改动一个文件）。
      chunkhash: 根据 chunk 生成的 hash 值。如果打包来源于同一个 chunk，那么 hash 值也相同。
        问题：js 和 css 的 hash 值还是相同的。
          因为 css 是在 js 中被引入的，所以同属于一个 chunk
      contenthash: 根据文件内容生成的 hash 值，不同文件的 hash 值不同。
      --> 让上线代码运行缓存更好用
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置 node 环境变量: 决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// 复用 loader 配置
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        // postcss 配置
        plugins: [
          // postcss-preset-env 插件
          require('postcss-preset-env')(),
        ],
      },
    },
  },
];

// webpack 配置
module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出的文件名
    filename: 'assets/js/built.[contenthash:10].js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的 loader 配置
      /*
        正常来讲，一个文件只能被一个 loader 处理
        当一个文件被多个 loader 处理时，那么一定要指定 loader 的执行顺序:
          先执行 eslint 再处理 babel
      */
      {
        // 在 package.json 中配置 eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 优先执行
        enforce: 'pre',
        options: {
          // 自动修复
          fix: true,
        },
      },
      {
        // 一下 loader 只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
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
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  // 基本语法兼容
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定 corejs 的版本
                    corejs: { version: 3 },
                    // 指定兼容性做到哪个版本浏览器
                    targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' },
                  },
                ],
              ],
              // 开启 babel 缓存
              // 第二次构建时，会读取缓存，加快构建速度
              cacheDirectory: true,
            },
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name]-[contenthash:8].[ext]',
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
              name: '[name]-[contenthash:8].[ext]',
              outputPath: 'assets/media',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩 html 文件
      minify: {
        // 压缩 html 文件
        removeComments: true, // 移除 HTML 注释
        collapseWhitespace: true, // 移除空格
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[contenthash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  // 开发模式 'development' | 'production'
  // 生产环境下，会自动压缩 js 代码
  mode: 'production',
};
```

3.运行指令

```bash
npx webpack
```

## 5.5 tree shaking

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  tree shaking: 去除无用的代码
    前提：1.必须使用 ES6 模块化语法 2.开启 production 模式
    作用：减少代码体积

    在 package.json 中配置 
      "sideEffects": false，表示所有代码都没有副作用，都可以进行 tree shaking
        问题：可能会把 css、@babel-/polyfill （副作用）文件都干掉
      "sideEffects": ["*.css","*.less"]，不会对这些文件进行 tree shaking
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置 node 环境变量: 决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// 复用 loader 配置
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        // postcss 配置
        plugins: [
          // postcss-preset-env 插件
          require('postcss-preset-env')(),
        ],
      },
    },
  },
];

// webpack 配置
module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出的文件名
    filename: 'assets/js/built.[contenthash:10].js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的 loader 配置
      /*
        正常来讲，一个文件只能被一个 loader 处理
        当一个文件被多个 loader 处理时，那么一定要指定 loader 的执行顺序:
          先执行 eslint 再处理 babel
      */
      {
        // 在 package.json 中配置 eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 优先执行
        enforce: 'pre',
        options: {
          // 自动修复
          fix: true,
        },
      },
      {
        // 一下 loader 只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
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
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  // 基本语法兼容
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定 corejs 的版本
                    corejs: { version: 3 },
                    // 指定兼容性做到哪个版本浏览器
                    targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' },
                  },
                ],
              ],
              // 开启 babel 缓存
              // 第二次构建时，会读取缓存，加快构建速度
              cacheDirectory: true,
            },
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name]-[contenthash:8].[ext]',
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
              name: '[name]-[contenthash:8].[ext]',
              outputPath: 'assets/media',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩 html 文件
      minify: {
        // 压缩 html 文件
        removeComments: true, // 移除 HTML 注释
        collapseWhitespace: true, // 移除空格
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[contenthash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  // 开发模式 'development' | 'production'
  // 生产环境下，会自动压缩 js 代码
  mode: 'production',
};
```

3.运行指令

```bash
npx webpack
```

## 5.6 code split

1.创建文件

2.修改 webpack.config.js 文件

### 第一种

```js
/*

*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 设置 node 环境变量: 决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// webpack 配置
module.exports = {
  // 单入口
  //entry: './src/index.js',
  entry: {
    // 多入口：有一个入口，最终输出就有一个 bundle
    main: './src/index.js',
    test: './src/js/test.js',
  },
  // 输出
  output: {
    // [name]: 取文件名
    filename: 'assets/js/[name].[contenthash:10].js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩 html 文件
      minify: {
        // 压缩 html 文件
        removeComments: true, // 移除 HTML 注释
        collapseWhitespace: true, // 移除空格
      },
    }),
  ],
  // 开发模式 'development' | 'production'
  // 生产环境下，会自动压缩 js 代码
  mode: 'production',
};
```

### 第二种

```js
/*

*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 设置 node 环境变量: 决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// webpack 配置
module.exports = {
  // 单入口
  // entry: './src/index.js',
  entry: {
    // 多入口：有一个入口，最终输出就有一个 bundle
    main: './src/index.js',
    test: './src/js/test.js',
  },
  // 输出
  output: {
    // [name]: 取文件名
    filename: 'assets/js/[name].[contenthash:10].js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩 html 文件
      minify: {
        // 压缩 html 文件
        removeComments: true, // 移除 HTML 注释
        collapseWhitespace: true, // 移除空格
      },
    }),
  ],
  /*
    1. 可以将 node_modules 中的代码单独打包一个 chunk 最终输出
    2. 自动分析多入口 chunk 中有没有公共的依赖。如果有会打包成单独一个 chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  // 开发模式 'development' | 'production'
  // 生产环境下，会自动压缩 js 代码
  mode: 'production',
};
```

3.运行指令

```bash
npx webpack
```

### 第三种

```js
/*

*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 设置 node 环境变量: 决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// webpack 配置
module.exports = {
  // 单入口
  // entry: './src/index.js',
  entry: {
    // 多入口：有一个入口，最终输出就有一个 bundle
    main: './src/index.js',
    test: './src/js/test.js',
  },
  // 输出
  output: {
    // [name]: 取文件名
    filename: 'assets/js/[name].[contenthash:10].js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩 html 文件
      minify: {
        // 压缩 html 文件
        removeComments: true, // 移除 HTML 注释
        collapseWhitespace: true, // 移除空格
      },
    }),
  ],
  /*
    1. 可以将 node_modules 中的代码单独打包一个 chunk 最终输出
    2. 自动分析多入口 chunk 中有没有公共的依赖。如果有会打包成单独一个 chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  // 开发模式 'development' | 'production'
  // 生产环境下，会自动压缩 js 代码
  mode: 'production',
};
```

## 5.7 lazy loading

1.创建文件

2.修改 webpack.config.js 文件

```js
/*

*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 设置 node 环境变量: 决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// webpack 配置
module.exports = {
  // 单入口
  //entry: './src/index.js',
  entry: {
    // 多入口：有一个入口，最终输出就有一个 bundle
    main: './src/index.js',
    test: './src/js/test.js',
  },
  // 输出
  output: {
    // [name]: 取文件名
    filename: 'assets/js/[name].[contenthash:10].js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩 html 文件
      minify: {
        // 压缩 html 文件
        removeComments: true, // 移除 HTML 注释
        collapseWhitespace: true, // 移除空格
      },
    }),
  ],
  // 开发模式 'development' | 'production'
  // 生产环境下，会自动压缩 js 代码
  mode: 'production',
};
```

3.运行指令

```bash
npx webpack
```

## 5.8 PWA

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  PWA：Progressive Web App 渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// 设置 node 环境变量: 决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// 复用 loader 配置
const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    // fix: 打包后图片路径、字体文件路径错误问题
    options: {
      publicPath: '../../',
    },
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        // postcss 配置
        plugins: [
          // postcss-preset-env 插件
          require('postcss-preset-env')(),
        ],
      },
    },
  },
];

// webpack 配置
module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出的文件名
    filename: 'assets/js/built.[contenthash:10].js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的 loader 配置
      /*
        正常来讲，一个文件只能被一个 loader 处理
        当一个文件被多个 loader 处理时，那么一定要指定 loader 的执行顺序:
          先执行 eslint 再处理 babel
      */
      {
        // 在 package.json 中配置 eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 优先执行
        enforce: 'pre',
        options: {
          // 自动修复
          fix: true,
        },
      },
      {
        // 一下 loader 只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
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
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  // 基本语法兼容
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定 corejs 的版本
                    corejs: { version: 3 },
                    // 指定兼容性做到哪个版本浏览器
                    targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' },
                  },
                ],
              ],
              // 开启 babel 缓存
              // 第二次构建时，会读取缓存，加快构建速度
              cacheDirectory: true,
            },
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name]-[contenthash:8].[ext]',
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
              name: '[name]-[contenthash:8].[ext]',
              outputPath: 'assets/media',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩 html 文件
      minify: {
        // 压缩 html 文件
        removeComments: true, // 移除 HTML 注释
        collapseWhitespace: true, // 移除空格
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[contenthash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助 serviceworker 快速启动
        2. 删除旧的 serviceworker

        生成一个 serviceworker 配置文件
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  // 开发模式 'development' | 'production'
  // 生产环境下，会自动压缩 js 代码
  mode: 'production',
};
```

3.运行指令

```bash
npx webpack
```

## 5.9 多进程打包

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  PWA：Progressive Web App 渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// 设置 node 环境变量: 决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// 复用 loader 配置
const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    // fix: 打包后图片路径、字体文件路径错误问题
    options: {
      publicPath: '../../',
    },
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        // postcss 配置
        plugins: [
          // postcss-preset-env 插件
          require('postcss-preset-env')(),
        ],
      },
    },
  },
];

// webpack 配置
module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出的文件名
    filename: 'assets/js/built.[contenthash:10].js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的 loader 配置
      /*
        正常来讲，一个文件只能被一个 loader 处理
        当一个文件被多个 loader 处理时，那么一定要指定 loader 的执行顺序:
          先执行 eslint 再处理 babel
      */
      {
        // 在 package.json 中配置 eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 优先执行
        enforce: 'pre',
        options: {
          // 自动修复
          fix: true,
        },
      },
      {
        // 一下 loader 只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
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
            use: [
              /*
                开启多线程打包
                进程启动大概为 600 ms，进程通信也有开销
                只有工作消耗时间较长，才需要多进程打包
              */
              {
                loader: 'thread-loader',
                options: {
                  workers: 2,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      // 基本语法兼容
                      '@babel/preset-env',
                      {
                        // 按需加载
                        useBuiltIns: 'usage',
                        // 指定 corejs 的版本
                        corejs: { version: 3 },
                        // 指定兼容性做到哪个版本浏览器
                        targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' },
                      },
                    ],
                  ],
                  // 开启 babel 缓存
                  // 第二次构建时，会读取缓存，加快构建速度
                  cacheDirectory: true,
                },
              },
            ],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name]-[contenthash:8].[ext]',
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
              name: '[name]-[contenthash:8].[ext]',
              outputPath: 'assets/media',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩 html 文件
      minify: {
        // 压缩 html 文件
        removeComments: true, // 移除 HTML 注释
        collapseWhitespace: true, // 移除空格
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[contenthash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助 serviceworker 快速启动
        2. 删除旧的 serviceworker

        生成一个 serviceworker 配置文件
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  // 开发模式 'development' | 'production'
  // 生产环境下，会自动压缩 js 代码
  mode: 'production',
};
```

3.运行指令

```bash
npx webpack
```

## 5.10 externals

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
    loader: 1.下载  2.使用（配置 loader)
    plugins: 1.下载  2.引入  3.使用
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack 配置
module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出的文件名
    filename: 'js/built.js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的 loader 配置
    ],
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
    }),
  ],
  // 开发模式 'development' | 'production'
  mode: 'production',
  externals: {
    // 忽略库名-- npm 包名
    // 拒绝 jQuery 被打包进 js 文件
    jquery: 'jQuery',
  },
};
```

3.运行指令

```bash
npx webpack
```

## 5.11 dll

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
    loader: 1.下载  2.使用（配置 loader)
    plugins: 1.下载  2.引入  3.使用
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// webpack 配置
module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出的文件名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs 的全局变量，代表当前文件（webpack.config.js）所在目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的 loader 配置
    ],
  },
  // plugins 的配置
  plugins: [
    // 插件的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html 文件，自动引入打包输出的所有资源（js、css等）
    // 需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源
      template: './src/index.html',
    }),
    // 告诉 webpack 哪些库不参与打包，同时使用时的名称也得变
    new webpack.DllReferencePlugin({
      // 动态链接库的 manifest 文件路径
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 将某个文件打包输出出去，并在 html 中自动引入
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
    }),
  ],
  // 开发模式 'development' | 'production'
  mode: 'production',
};
```

3.创建 webpack.dll.js

```js
/*
  使用 dll 技术，对某些库（第三方库：jquery、react、vue等）进行单独打包
  当你运行 webpack 时，默认查找 webpack.config.js 配置文件
  需求：需要运行 webpack.dll.js 文件
    --> webpack --config webpack.dll.js
*/

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是 jquery
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露出的内容叫什么名字
  },
  plugins: [
    // 打包生成一个 manifest.json --> 提供和 jquery 映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json'), // 输出文件路径
    }),
  ],
  mode: 'production',
};
```

4.运行指令

```bash
npx webpack
```
