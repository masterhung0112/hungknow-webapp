declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Get configuration.
     * See https://api.mattermost.com/#tag/system/paths/~1config/get
     * @returns {AdminConfig} `out.config` as `AdminConfig`
     *
     * @example
     *   cy.apiGetConfig().then(({config}) => {
     *       // do something with config
     *   });
     */
    apiGetConfig(): Chainable<{ config: AdminConfig }>

    /**
     * Update configuration.
     * See https://api.mattermost.com/#tag/system/paths/~1config/put
     * @param {AdminConfig} newConfig - new config
     * @returns {AdminConfig} `out.config` as `AdminConfig`
     *
     * @example
     *   cy.apiUpdateConfig().then(({config}) => {
     *       // do something with config
     *   });
     */
    apiUpdateConfig(newConfig: AdminConfig): Chainable<AdminConfig>
  }
}
