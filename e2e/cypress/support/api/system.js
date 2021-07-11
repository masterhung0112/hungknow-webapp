import merge from 'deepmerge';

import partialDefaultConfig from '../../fixtures/partial_default_config.json';

const getDefaultConfig = () => {
    const fromCypressEnv = {
        LdapSettings: {
            LdapServer: Cypress.env('ldapServer'),
            LdapPort: Cypress.env('ldapPort'),
        },
        ServiceSettings: {SiteURL: Cypress.config('baseUrl')},
    };

    return merge(partialDefaultConfig, fromCypressEnv);
};

Cypress.Commands.add('apiUpdateConfig', (newConfig = {}) => {
    // # Get current settings
    return cy.request('/api/v1/config').then((response) => {
        const oldConfig = response.body;

        const config = merge.all([oldConfig, getDefaultConfig(), newConfig]);

        // # Set the modified config
        return cy.
            request({
                url: '/api/v1/config',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                method: 'PUT',
                body: config,
            }).
            then((updateResponse) => {
                expect(updateResponse.status).to.equal(200);
                return cy.apiGetConfig();
            });
    });
});

Cypress.Commands.add('apiGetConfig', () => {
    // # Get current settings
    return cy.request('/api/v1/config').then((response) => {
        expect(response.status).to.equal(200);
        return cy.wrap({config: JSON.parse(response.body)});
    });
});
