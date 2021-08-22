// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');

const STANDARD_EXCLUDE = [
    /node_modules/,
    // path.join(__dirname, '..', 'dist'),
];

module.exports = async ({config, mode}) => {
    config.module.rules[0].exclude = STANDARD_EXCLUDE;
    config.module.rules[0].test = /\.(js|jsx|ts|tsx)?$/;
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias['hkuisass'] = path.resolve(__dirname, '..', 'src', 'sass')

    config.module.rules.push({
      test: /\.module.(s?css)$/,
      use: [
          'style-loader',
          {
              loader: 'css-loader',
              options: {
                modules: {
                    localIdentName: "[name]__[local]__[hash:base64:5]",
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
    });

    config.module.rules.push({
        test: /\.(s?css)$/,
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
        exclude: /\.module\.(css|scss)$/,
      });

    return config;
};
