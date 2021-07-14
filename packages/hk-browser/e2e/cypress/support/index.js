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

import '@testing-library/cypress/add-commands';
import 'cypress-react-unit-test/support';
import '@cypress/code-coverage/support';
import 'cypress-react-selector';
import 'cypress-wait-until';

import './db_commands';
import './api';

import {getAdminAccount} from './env';

before(() => {
    const admin = getAdminAccount();

    cy.dbGetUser({username: admin.username}).then(({user}) => {
        if (user.id) {
            // # Login existing sysadmin
            cy.apiAdminLogin().then(() => sysadminSetup(user));
        } else {
            // # Create and login a newly created user as sysadmin
            cy.apiCreateAdmin().then(({sysadmin}) => {
                cy.apiAdminLogin().then(() => sysadminSetup(sysadmin));
            });
        }
    });
});

// Add login cookies to whitelist to preserve it
beforeEach(() => {
    Cypress.Cookies.preserveOnce('HKAUTHTOKEN', 'HKUSERID', 'HKCSRF');
});

function sysadminSetup(user) {
    if (!user.email_verified) {
    // cy.apiVerifyUserEmailById(user.id)
    }

    // # Reset config and invalidate cache
    // cy.apiUpdateConfig()
    // cy.apiInvalidateCache()

    // # Reset admin preference, online status and locale
    // cy.apiSaveTeammateNameDisplayPreference('username')
    // cy.apiSaveLinkPreviewsPreference('true')
    // cy.apiSaveCollapsePreviewsPreference('false')
    // cy.apiSaveClockDisplayModeTo24HourPreference(false)
    // cy.apiSaveTutorialStep(user.id, '999')
    // cy.apiSaveCloudOnboardingPreference(user.id, 'hide', 'true')
    // cy.apiHideSidebarWhatsNewModalPreference(user.id, 'true')
    // cy.apiUpdateUserStatus('online')
    // cy.apiPatchMe({
    //   locale: 'en',
    //   timezone: { automaticTimezone: '', manualTimezone: 'UTC', useAutomaticTimezone: 'false' },
    // })

    // // # Reset roles
    // cy.apiGetClientLicense().then(({ license }) => {
    //   if (license.IsLicensed === 'true') {
    //     cy.apiResetRoles()
    //   }
    // })

    // // # Check if default team is present; create if not found.
    // cy.apiGetTeamsForUser().then(({ teams }) => {
    //   // Default team is meant for sysadmin's primary team,
    //   // selected for compatibility with existing local development.
    //   // It is not exported since it should not be used for testing.
    //   const DEFAULT_TEAM = { name: 'ad-1', display_name: 'eligendi', type: 'O' }

    //   const defaultTeam = teams && teams.length > 0 && teams.find((team) => team.name === DEFAULT_TEAM.name)

    //   if (!defaultTeam) {
    //     cy.apiCreateTeam(DEFAULT_TEAM.name, DEFAULT_TEAM.display_name, 'O', false)
    //   } else if (defaultTeam && Cypress.env('resetBeforeTest')) {
    //     teams.forEach((team) => {
    //       if (team.name !== DEFAULT_TEAM.name) {
    //         cy.apiDeleteTeam(team.id)
    //       }
    //     })

    //     cy.apiGetChannelsForUser('me', defaultTeam.id).then(({ channels }) => {
    //       channels.forEach((channel) => {
    //         if (
    //           (channel.team_id === defaultTeam.id || channel.team_name === defaultTeam.name) &&
    //           channel.name !== 'town-square' &&
    //           channel.name !== 'off-topic'
    //         ) {
    //           cy.apiDeleteChannel(channel.id)
    //         }
    //       })
    //     })
    //   }
    // })
}
