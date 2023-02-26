const webpackConfigMf = require('./webpack-config-mf');

module.exports = webpackConfigMfReact;

function webpackConfigMfReact(opts) {
  opts.framework = 'react';
  opts.react = true;

  const reactConfig = webpackConfigMf(opts);

  if (!opts.webpackConfigEnv?.standalone) {
    reactConfig.externals.push('react', 'react-dom');
  }

  return reactConfig;
}
