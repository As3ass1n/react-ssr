const path = require('path');

const browserConfig = {
  entry: './src/client/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: { presets: ['react', 'env'] },
        },
      },
    ],
  },
};

const serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'server.js',
    libraryTarget: 'commonjs2', // 通过配置不同的libraryTarget生成不同的umd代码，commonjs2表示模块用于commonjs环境
  },
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['react', 'env'] },
      },
    ],
  },
  externals: /node_modules/, // 告知webpack在打包过程中，遇到externals中声明的模块不用处理
  /**
   * 打包后生成的代码，__dirname,__filename输出全部都是/，主要是因为这两个变量在webpack中做了一些自定义处理，正确使用的话需要加上下面这些参数
   * 参考连接：https://zhuanlan.zhihu.com/p/20782320
   */
  context: __dirname,
  node: {
    __dirname: false,
    __filename: false,
  },
};

module.exports = [browserConfig, serverConfig];
