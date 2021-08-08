const path = require('path');

module.exports = {
  "stories": [
    // "../src/core/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "include": [
    "../src/**/*.stories.ts",
    "../src/**/*.stories.tsx"
  ]
}