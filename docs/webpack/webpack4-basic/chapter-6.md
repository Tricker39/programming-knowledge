# 第 6 章 Webpack 配置详情

## 6.1 entry

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  entry: 入口文件
    1.String --> './src/index.js'
      单入口
      打包形成一个 chunk，输出一个 bundle 文件
      此时 chunk 的默认名称是 main
    2.Array --> ['./src/index.js', './src/other.js']
      多入口
      所有入口文件最终只会形成一个 chunk，输出一个 bundle 文件
        --> 只有在 HMR 功能中让 html 热更新生效
    3.Object --> { index: './src/index.js', other: './src/other.js' }
      多入口
      有几个入口文件，就会形成几个 chunk，输出几个 bundle 文件
      此时 chunk 的名称就是 key 值

      --> 特殊用法   
        {
          // 所有入口文件最终只会形成一个 chunk，输出一个 bundle 文件
          index: ['./src/index.js', './src/vendor.js'],
          // 只会形成一个 chunk，输出一个 bundle 文件
          other: './src/other.js',
        }
*/

const { resolve } = require('path');
// 第一种写法
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
};
// 第二种写法
module.exports = {
  entry: ['./src/index.js', './src/other.js'],
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
};
// 第三种写法
module.exports = {
  entry: {
    index: './src/index.js',
    other: './src/other.js',
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
};
```

3.运行指令

```bash
npx webpack
```

## 6.2 output

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  
*/

const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称+目录）
    filename: 'js/[name].js',
    // 输出文件目录（将来所有资源的公共目录）
    path: resolve(__dirname, 'build'),
    // 所有资源引入公共路径（前缀） --> 路径最前面
    publicPath: '/',
    // 非入口 chunk 名称
    chunkFilename: 'js/[name]_chunk.js',
    // 整个库向外暴露的变量名
    library: '[name]',
    // 变量名添加到哪个全局对象上
    // window --> browser
    // global --> node
    // commonjs、amd
    libraryTarget: 'window',
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
};
```

3.运行指令

```bash
npx webpack
```

## 6.3 module

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  
*/

const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader 配置
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // 多个 loader 用 use
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        // 排除 node_modules 下的 js 文件
        exclude: /node_modules/,
        // 只检查 src 目录下的 js文件
        include: resolve(__dirname, 'src'),
        // pre 优先执行
        // post 延后执行
        enforce: 'pre',
        // 单个 loader 用 loader
        loader: 'eslint-loader',
      },
      {
        // 以下配置只会生效一个
        oneOf: [],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
};
```

3.运行指令

```bash
npx webpack
```

## 6.4 resolve

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  
*/

const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader 配置
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // 多个 loader 用 use
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
  // 解析模块规则
  resolve: {
    // 配置路径别名：优点 -> 简写路径 缺点：路径没有提示
    alias: {
      '@': resolve(__dirname, 'src'),
      $css: resolve(__dirname, 'src/css'),
    },
    // 配置省略文件路径的后缀名
    extentions: ['.js', '.json', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录
    modules: [resolve(__dirname, '../../node_modules', 'node_modules')],
  },
};
```

3.运行指令

```bash
npx webpack
```

## 6.5 devServer

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  
*/

const { resolve } = require('path');
const { devServer } = require('../33.devServer/webpack.config');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      $css: resolve(__dirname, 'src/css'),
    },
    extentions: ['.js', '.json', '.css'],
    modules: [resolve(__dirname, '../../node_modules', 'node_modules')],
  },
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/,
    },
    // 启动 gzip 压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启 HMR 功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏提示
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦 devServer （5000） 服务器接收到 /api/xxx 的请求，就会将请求转发到 3000 端口的服务器上
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx 替换为 '/xxx' （去掉 /api）
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
```

3.运行指令

```bash
npx webpack
```

## 6.6 optimization

1.创建文件

2.修改 webpack.config.js 文件

```js
/*
  
*/

const { resolve } = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name]-[contenthash:8].js',
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:8]_chunk.js',
  },
  module: {
    rules: [
      // loader 配置
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // 多个 loader 用 use
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'production',
  // 解析模块规则
  resolve: {
    // 配置路径别名：优点 -> 简写路径 缺点：路径没有提示
    alias: {
      '@': resolve(__dirname, 'src'),
      $css: resolve(__dirname, 'src/css'),
    },
    // 配置省略文件路径的后缀名
    extentions: ['.js', '.json', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录
    modules: [resolve(__dirname, '../../node_modules', 'node_modules')],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 下面是默认值
      minSize: 30 * 1024, // 需要分割的 chunk 最小为 30 kb，小于 30 kb 的 chunk 不会被分割
      maxSize: 0, // 不限制大小
      minChunks: 1, // 要提取的 chunks 最少被引用 1 次
      maxAsyncRequests: 5, // 按需加载时最大的并行请求数量
      maxInitialRequests: 3, // 入口文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      // 分割 chunk 的组
      cacheGroups: {
        default: {
          // 要提取的 chunk 最少被引用 2 次
          minChunks: 2,
          // 优先级更低
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用之前的模块，而不是重新打包模块。
          reuseExistingChunk: true,
        },
        // node_modules 文件会被打包到 vendors 组的 chunk 中。 --> vendor~xxx.js
        // 满足上面的公共规则，如：大小超过 30kb，最少被引用 1 次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10,
        },
      },
    },
    // 将当前模块的记录其他模块的 hash 值单独打包成一个文件 runtime
    // 解决：修改 a 文件导致 b 文件的 contenthash 变化，导致缓存失效
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 配置生产环境的压缩方案：js 和 css
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            // 开启缓存
            cache: true,
            // 开启多进程打包
            parallel: true,
            // 启用 sourceMap
            sourceMap: true,
            // 去掉注释
            comments: false,
            // 去掉 console.log
            drop_console: true,
          },
        },
      }),
    ],
  },
};
```

3.运行指令

```bash
npx webpack
```
