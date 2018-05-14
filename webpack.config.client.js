const path = require("path");

module.exports = () => {
  return {
    entry: "./client/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  };
};
