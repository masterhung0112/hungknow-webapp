// ***********************************************************
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@testing-library/cypress/add-commands'
import 'cypress-react-unit-test/support'
import '@cypress/code-coverage/support'
import 'cypress-react-selector'
import 'cypress-wait-until'

import './db_commands'
import './api'

import { getAdminAccount } from './env'

before(() => {
  const admin = getAdminAccount()

  cy.dbGetUser({ username: admin.username }).then(({ user }) => {
    if (user.id) {
      // # Login existing sysadmin
      cy.apiAdminLogin().then(() => sysadminSetup(user))
    } else {
      // # Create and login a newly created user as sysadmin
      cy.apiCreateAdmin().then(({ sysadmin }) => {
        cy.apiAdminLogin().then(() => sysadminSetup(sysadmin))
      })
    }
  })
})

// Add login cookies to whitelist to preserve it
beforeEach(() => {
  Cypress.Cookies.preserveOnce('HKAUTHTOKEN', 'HKUSERID', 'HKCSRF')
})
