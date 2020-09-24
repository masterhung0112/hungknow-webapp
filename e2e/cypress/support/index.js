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

import './commands'
