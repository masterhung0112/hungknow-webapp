import { AdminConfig } from 'hkclient-redux/types/config'

import { translationData } from '../../support/intlProvider'

let adminConfig: AdminConfig

describe('Signup Email page', () => {
  before(() => {
    // Disable other auth options
    const newSettings = {
      //   Office365Settings: { Enable: false },
      //   LdapSettings: { Enable: false },
    } as AdminConfig
    cy.apiUpdateConfig(newSettings)

    cy.apiGetConfig().then(({ config }) => {
      adminConfig = config
    })

    cy.apiLogout()

    // # Go to signup email page
    cy.visit('/signup-email')
  })

  it('should render with site name', () => {
    // * check the initialUrl
    cy.url().should('include', '/signup-email')

    // * Check that the login section is loaded
    cy.get('#signup_email_section').should('be.visible')

    // * Check the title
    cy.title().should('include', adminConfig.TeamSettings.SiteName)
  })

  // it('should match elements, back button', () => {
  //   // * Check elements in the header with back button
  //   cy.get('#back_button').should('be.visible')
  //   cy.get('#back_button').should('contain', 'Back')
  //   cy.get('#back_button_icon').should('be.visible')
  //   cy.get('#back_button_icon').should('have.attr', 'title', 'Back Icon')
  // })

  it('should match elements, body', () => {
    // * Check elements in the body
    cy.get('#signup_email_section').should('be.visible')
    cy.get('#site_name').should('contain', adminConfig.TeamSettings.SiteName)
    cy.get('#site_description').should('contain', adminConfig.TeamSettings.CustomDescriptionText)
    cy.get('#create_account').should('contain', translationData['signup_user_completed.lets'])
    cy.get('#signin_account').should('contain', translationData['signup_user_completed.haveAccount'])
    cy.get('#signin_account').should('contain', translationData['signup_user_completed.signIn'])
    cy.get('#signin_account_link').should('contain', 'Click here to sign in.')
    cy.get('#signin_account_link').should('have.attr', 'href', '/login')

    cy.get('#email_label').should('contain', "What's your email address?")
    cy.get('#email').should('be.visible')
    cy.focused().should('have.attr', 'id', 'email')
    cy.get('#valid_email').should('contain', 'Valid email required for sign-up')

    cy.get('#name_label').should('contain', 'Choose your username')
    cy.get('#name').should('be.visible')
    cy.get('#valid_name').should('contain', 'You can use lowercase letters, numbers, periods, dashes, and underscores.')

    cy.get('#password_label').should('contain', 'Choose your password')
    cy.get('#password').should('be.visible')

    cy.get('#createAccountButton').scrollIntoView().should('be.visible')
    cy.get('#createAccountButton').should('contain', 'Create Account')

    cy.get('#signup_agreement').should(
      'contain',
      `By proceeding to create your account and use ${adminConfig.TeamSettings.SiteName}, you agree to our Terms of Service and Privacy Policy. If you do not agree, you cannot use ${adminConfig.TeamSettings.SiteName}.`
    )
    cy.get(`#signup_agreement > span > [href="${adminConfig.SupportSettings.TermsOfServiceLink}"]`).should('be.visible')
    cy.get(`#signup_agreement > span > [href="${adminConfig.SupportSettings.PrivacyPolicyLink}"]`).should('be.visible')
  })

  // it('should match elements, footer', () => {
  //   // * Check elements in the footer
  //   cy.get('#footer_section').scrollIntoView().should('be.visible')
  //   cy.get('#company_name').should('contain', 'HungKnow')
  //   cy.get('#copyright').should('contain', '© 2020-')
  //   cy.get('#copyright').should('contain', 'HungKnow, Inc.')
  //   cy.get('#about_link').should('contain', 'About')
  //   cy.get('#about_link').should('have.attr', 'href', adminConfig.SupportSettings.AboutLink)
  //   cy.get('#privacy_link').should('contain', 'Privacy')
  //   cy.get('#privacy_link').should('have.attr', 'href', adminConfig.SupportSettings.PrivacyPolicyLink)
  //   cy.get('#terms_link').should('contain', 'Terms')
  //   cy.get('#terms_link').should('have.attr', 'href', adminConfig.SupportSettings.TermsOfServiceLink)
  //   cy.get('#help_link').should('contain', 'Help')
  //   cy.get('#help_link').should('have.attr', 'href', adminConfig.SupportSettings.HelpLink)
  // })
})
