import { getAdminAccount } from '../env'

Cypress.Commands.add('apiLogin', (user) => {
  cy.request({
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    url: '/api/v1/users/login',
    method: 'POST',
    body: { login_id: user.username, password: user.password },
  }).then((response) => {
    expect(response.status).to.equal(200)
    return cy.wrap({
      user: {
        ...response.body,
        password: user.password,
      },
    })
  })
})

Cypress.Commands.add('apiLogout', () => {
  cy.request({
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    url: '/api/v1/users/logout',
    method: 'POST',
    log: false,
  })

  // * Verify logged out
  //TODO: Open
  // cy.visit('/login?extra=expired').url().should('include', '/login?extra=expired')

  // # Ensure we clear out these specific cookies
  ;['HKAUTHTOKEN', 'HKUSERID', 'HKCSRF'].forEach((cookie) => {
    cy.clearCookie(cookie)
  })

  // # Clear remainder of cookies
  cy.clearCookies()

  // * Verify cookies are empty
  cy.getCookies({ log: false }).should('be.empty')
})

Cypress.Commands.add('apiAdminLogin', () => {
  const admin = getAdminAccount()

  return cy.apiLogin(admin)
})

/**
 * Verify a user email via API
 * @param {String} userId - ID of user of email to verify
 */
Cypress.Commands.add('apiVerifyUserEmailById', (userId) => {
  const options = {
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    method: 'POST',
    url: `/api/v1/users/${userId}/email/verify/member`,
  }

  return cy.request(options).then((response) => {
    expect(response.status).to.equal(200)
    cy.wrap({ user: response.body })
  })
})
