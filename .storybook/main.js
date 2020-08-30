const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    // "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "include": [
    "../types.d.ts",
    "../next-env.d.ts",
    "../**/*.stories.ts",
    "../**/*.stories.tsx"
  ],
  // webpackFinal: async config => {
  //   config.module.rules.push({
  //     test: /\.(ts|tsx)$/,
  //     use: [
  //       {
  //         loader: require.resolve('awesome-typescript-loader'),
  //         options:{
  //           configFileName: path.resolve(__dirname, './tsconfig.json')
  //         }
  //       },
  //     ],
  //   });
  //   config.resolve.extensions.push('.ts', '.tsx');
  //   return config;
  // }
}