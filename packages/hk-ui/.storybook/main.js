const path = require('path');

module.exports = {
  "stories": [
    // "../src/core/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  // "include": [
  //   "../src/**/*.stories.ts",
  //   "../src/**/*.stories.tsx"
  // ],
  // webpackFinal: async (config, { configType }) => {
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ['style-loader', 'css-loader', 'sass-loader'],
  //     include: path.resolve(__dirname, '../src'),
  //   });
  // }
}