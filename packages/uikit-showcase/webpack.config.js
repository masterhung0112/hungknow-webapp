const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const devWebConfig = require("./webpack.config.dev");
const webpack = require("webpack");

const CSP_UNSAFE_EVAL_IF_DEV = " 'unsafe-eval'";
const isDev = process.env.NODE === "development";

const defaultConfig = {
  mode: "production",
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  // modify the webpack config however you'd like to by adding to this object
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules|\.d\.ts$/,
      },
      // ts-loader won't handle .d.ts, we ignore .d.ts by this loader
      { test: /\.d.ts$/, loader: "ignore-loader" },
      {
        test: /\.(scss)$/,
        sideEffects: true,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.mdx?$/,
        use: [
          { loader: "babel-loader", options: {} },
          {
            loader: "@mdx-js/loader",
            /** @type {import('@mdx-js/loader').Options} */
            options: {},
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    // Copy public file from uikit
    new CopyPlugin({
      patterns: [
        {
          from: "../../node_modules/@hungknow/uikit/dist/public",
          to: "public",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: "head",
      template: "public/index.html",
    }),
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    return merge(defaultConfig, devWebConfig);
  }
  return defaultConfig;
};
