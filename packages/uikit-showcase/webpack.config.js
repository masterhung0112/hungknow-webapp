const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "hungknow",
    projectName: "uikit-showcase",
    webpackConfigEnv,
    argv,
    orgPackagesAsExternal: false,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.(scss)$/,
          sideEffects: true,
          use: [
              'style-loader',
              {
                  loader: 'css-loader',
                  options: {
                    modules: {
                        localIdentName: "[local]",
                    },
                    sourceMap: true,
                  },
              },
              {
                  loader: 'sass-loader',
                  options: {
                      sourceMap: true,
                  },
              },
          ],
        },
        {
          test: /\.mdx?$/,
          use: [
            {loader: 'babel-loader', options: {}},
            {
              loader: '@mdx-js/loader',
              /** @type {import('@mdx-js/loader').Options} */
              options: {}
            }
          ]
        }
      ]
    },
    plugins: [
      // Copy public file from uikit
      new CopyPlugin({
          patterns: [{
              from: '../../node_modules/@hungknow/uikit/dist/public',
              to: 'public'
          }]
      })
  ],
  });
};
