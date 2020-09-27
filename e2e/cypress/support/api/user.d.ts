declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Logout a user's active session from server via API.
     * See https://api.mattermost.com/#tag/users/paths/~1users~1logout/post
     * Clears all cookies espececially `MMAUTHTOKEN`, `MMUSERID` and `MMCSRF`.
     *
     * @example
     *   cy.apiLogout();
     */
    apiLogout()
  }
}
