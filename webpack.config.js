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
    libraryTarget: 'commonjs2',
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
};

module.exports = [browserConfig, serverConfig];
