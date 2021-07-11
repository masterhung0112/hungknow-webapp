const dbConfig = {
    client: Cypress.env('dbClient'),
    connection: Cypress.env('dbConnection'),
};

/**
 * Gets user on a given username directly from the database
 * @param {String} username
 * @returns {Object} user - user object
 */
Cypress.Commands.add('dbGetUser', ({username}) => {
    cy.task('dbGetUser', {dbConfig, params: {username}}).then(({user, errorMessage}) => {
        expect(errorMessage).to.be.undefined;

        cy.wrap({user});
    });
});
