/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const log = (message) => {
  console.log(message);
  return null;
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('task', {
    log,
  });

  return config
}
