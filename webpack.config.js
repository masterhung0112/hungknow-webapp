const path = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// globals
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const DEV_PORT = process.env.PORT || 9000;
// const PACKAGE_NAME = getPackageName();

const STANDARD_EXCLUDE = [path.join(__dirname, "node_modules")];

/**
 * Configure plugins loaded based on environment.
 */
const plugins = [
  // Used for async error reporting
  // Can remove after https://github.com/webpack/webpack/issues/3460 resolved
  new CheckerPlugin(),

  // CSS extraction is only enabled in production (see scssLoaders below).
  new MiniCssExtractPlugin({ filename: "[name].css" }),
];

const extractPlugin = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    esModule: true,
  },
};

// Module loaders for .scss files, used in reverse order:
// compile Sass, apply PostCSS, interpret CSS as modules.
const scssLoaders = [
  // Only extract CSS to separate file in production mode.
  IS_PRODUCTION ? extractPlugin : require.resolve("style-loader"),
  {
    loader: require.resolve("css-loader"),
    options: {
      // necessary to minify @import-ed files using cssnano
      importLoaders: 1,
    },
  },
  {
    loader: require.resolve("postcss-loader"),
    options: {
      plugins: [
        require("autoprefixer"),
        require("cssnano")({ preset: "default" }),
      ],
    },
  },
  require.resolve("sass-loader"),
];

module.exports = {
  devtool: IS_PRODUCTION ? false : "inline-source-map",
  mode: IS_PRODUCTION ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: STANDARD_EXCLUDE,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,

            // Babel configuration is in .babelrc because jest requires it to be there.
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: require.resolve("awesome-typescript-loader"),
        options: {
          configFileName: "./tsconfig.json",
        },
      },
      {
        test: /\.scss$/,
        use: scssLoaders,
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|png|gif|jpe?g)$/,
        loader: require.resolve("file-loader"),
        options: {
          name: "[name].[ext]?[hash]",
          outputPath: "assets/",
        },
      },
    ],
  },

  plugins,

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
  },
};
