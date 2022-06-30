const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    entry: "./index.web-sample.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "jsonld-signatures-bbs.min.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "template.html",
      }),
    ],
    mode: "development",
    stats: "errors-only",
    devServer: {
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
  },
];
