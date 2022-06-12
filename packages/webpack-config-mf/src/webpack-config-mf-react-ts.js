const webpackConfigMfReact = require('./webpack-config-mf-react');
const webpackConfigMfTs = require('./webpack-config-mf-ts');

module.exports = webpackConfigMfReactTs;

function webpackConfigMfReactTs(opts) {
  opts.framework = 'react';
  opts.react = true;

  const reactConfig = webpackConfigMfReact(opts);

  if (!opts.webpackConfigEnv?.standalone) {
    reactConfig.externals.push('react', 'react-dom');
  }

  return webpackConfigMfTs.modifyConfig(opts, reactConfig);
}
