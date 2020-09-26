Cypress.Commands.add('apiLogout', () => {
  cy.request({
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    url: '/api/v1/users/logout',
    method: 'POST',
    log: false,
  })

  // * Verify logged out
  cy.visit('/login?extra=expired').url().should('include', '/login?extra=expired')

  // # Ensure we clear out these specific cookies
  ;['HKAUTHTOKEN', 'HKUSERID', 'HKCSRF'].forEach((cookie) => {
    cy.clearCookie(cookie)
  })

  // # Clear remainder of cookies
  cy.clearCookies()

  // * Verify cookies are empty
  cy.getCookies({ log: false }).should('be.empty')
})
