const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[hash:8].bundle.js',
    publicPath: '/',
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'my app',
      template: path.resolve(__dirname, 'src/client/html/index.html'),
      filename: 'index.html',
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist/client'),
    inline: true,
    hot: true,
    port: 8010,
  },
};
