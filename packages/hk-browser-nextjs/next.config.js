const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  // Module loaders for .scss files, used in reverse order:
  // compile Sass, apply PostCSS, interpret CSS as modules.
  // const scssLoaders = [
  //     // Only extract CSS to separate file in production mode.
  //     phase === PHASE_DEVELOPMENT_SERVER ? require.resolve('style-loader') : extractPlugin,
  //     {
  //         loader: require.resolve('css-loader'),
  //         options: {

  //             // necessary to minify @import-ed files using cssnano
  //             importLoaders: 1,
  //         },
  //     },
  //     {
  //         loader: require.resolve('postcss-loader'),
  //         options: {
  //             plugins: [require('autoprefixer'), require('cssnano')({preset: 'default'})],
  //         },
  //     },
  //     require.resolve('sass-loader'),
  // ];

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // config.devtool = 'source-map'
        // config.module.rules.push({
        //   test: /\.js$/,
        //   use: ['source-map-loader'],
        //   enforce: 'pre',
        // })
        config.stats = {
          warningsFilter: [/Failed to parse source map*/, (warning) => true],
        }

        // config.ignoreWarnings = [{ message: /Failed to parse source map/ }]
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.module.rules.push({
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
                publicPath: '/_next/static/images/',
                outputPath: 'static/images/',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {},
            },
          ],
        })

        // config.watchOptions.ignored = [
        //   /node_modules([\\]+|\/)+(?!hkclient-ts)/, // Regex to ignore all node_modules that not started with hkclient-ts
        //   /hkclient-ts([\\]+|\/)node_modules/, // Regex to ignore all node_modules inside hkclient-ts
        // ]

        config.resolve.alias['hkclient-redux'] = 'hkclient-redux/dist'
        config.resolve.alias['jquery'] = 'jquery/dist/jquery'
        config.resolve.alias['superagent'] = 'superagent/lib/client'
        config.plugins.push(
          new webpack.ProvidePlugin({
            'window.jQuery': 'jquery',
            $: 'jquery',
            jQuery: 'jquery',
            process: 'process/browser',
          })
        )
        config.devtool = 'eval-cheap-module-source-map'
        config.devServer = {
          hot: true,
          injectHot: true,
          liveReload: false,
          overlay: true,
          proxy: [
            {
              context: () => true,
              bypass(req) {
                if (
                  req.url.indexOf('/api') === 0 ||
                  req.url.indexOf('/plugins') === 0 ||
                  req.url.indexOf('/static/plugins/') === 0 ||
                  req.url.indexOf('/sockjs-node/') !== -1
                ) {
                  return null // send through proxy to the server
                }
                if (req.url.indexOf('/static/') === 0) {
                  return path // return the webpacked asset
                }

                // redirect (root, team routes, etc)
                return '/static/root.html'
              },
              logLevel: 'silent',
              target: 'http://localhost:8065',
              xfwd: true,
              ws: true,
            },
          ],
          port: 9005,
          watchContentBase: true,
          writeToDisk: false,
        }

        // Important: return the modified config
        return config
      },
      typescript: {
        // ignoreBuildErrors: true,
      },
      async rewrites() {
        return [
          {
            source: '/:any*',
            destination: '/',
          },
        ]
      },
    }
  }

  return {
    /* config options for all phases except development here */
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // config.module.rules.push({
      //     test: /\.(png|svg|jpg|gif)$/,
      //     use: [
      //         {
      //             loader: 'file-loader',
      //             options: {
      //                 name: '[hash].[ext]',
      //                 publicPath: '/_next/static/images/',
      //                 outputPath: 'static/images/',
      //             },
      //         },
      //         {
      //             loader: 'image-webpack-loader',
      //             options: {},
      //         },
      //     ],
      // });

      // config.module.rules.push({
      //     test: /\.scss$/,
      //     use: scssLoaders,
      // });
      config.resolve.alias['hkclient-redux'] = 'hkclient-redux/dist'

      // Important: return the modified config
      return config
    },
  }
}
