const { merge } = require("webpack-merge");
const { webpackConfigMfReactTs } = require("webpack-config-mf");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = webpackConfigMfReactTs({
    orgName: "hungknow",
    projectName: "uiux",
    webpackConfigEnv,
    orgPackagesAsExternal: !webpackConfigEnv.standalone, // @hungknow/uikit as a the built-in package
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
