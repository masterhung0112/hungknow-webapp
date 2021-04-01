declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    /**
     * Login as admin via API.
     * See https://api.mattermost.com/#tag/users/paths/~1users~1login/post
     * @returns {UserProfile} out.user: `UserProfile` object
     *
     * @example
     *   cy.apiAdminLogin();
     */
    apiAdminLogin(): Chainable<UserProfile>
  }
}
