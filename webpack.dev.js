const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const ESLintPlugin = require('eslint-webpack-plugin');

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "9000";

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    host: HOST,
    port: PORT,
    compress: true,
    inline: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    open: true
  },
  plugins: [
    new ESLintPlugin({ extensions: ["js", "jsx"], failOnWarning: true, })
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
});
