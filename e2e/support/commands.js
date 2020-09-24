import { api } from '../../../ApiReact/src/hooks/context/api'

/**
 * Helpful resources:
 * - https://ronvalstar.nl/useful-custom-cypress-commands
 * - https://noriste.github.io/reactjsday-2019-testing-course/book/cypress-testing-library.html
 */

// safeNow will return the current time
// in ticks, but won't return the same value twicelet lastNow = 0
let lastNow = 0
const safeNow = () => {
  let now = new Date().getTime()
  if (now === lastNow) {
    now++
  }
  lastNow = now
  return now
}

// getAuthor returns the name of the user (developer)
// will return the OS user unless AUTHOR is put in environment to override
export const getAuthor = () => {
  return process.env.REACT_APP_AUTHOR || process.env.USER || 'johndoe'
}

// generateUserPassword generates a new username/password combo for testing
// that is autoconfirmed upon signup and is unique on each call
Cypress.Commands.add('generateUserPassword', () => {
  const now = safeNow()
  const author = getAuthor()
  const username = `${author}+${now}_devtest@stably.io`
  const password = `Pwd!${now}`
  return [username, password]
})

/**
 * Return success: {
 *  data: {
 *     username: ''
 *     password: ''
 *  }
 * }
 */
Cypress.Commands.add('loginWithUserNamePassword', (username, password) => {
  return cy.wrap(
    new Promise((resolve, reject) => {
      api.auth
        .loginOrSignupAndLogin(username, password)
        .then((isOK) => {
          if (isOK) {
            resolve({
              data: {
                username: username,
                password: password,
              },
            })
          } else {
            reject({
              error: new Error(`invalid user account for login: "${username}", "${password}"`),
            })
          }
        })
        .catch(() => {
          reject({
            error: new Error(`invalid user account for login: "${username}", "${password}"`),
          })
        })
    }), { timeout: 10000 }
  )
})

// a custom Cypress command to login using XHR call
// and then set the received token in the local storage
// can log in with default user or with a given one
Cypress.Commands.add('login', (isRandom = false, defaultUserKey = 'user') => {
  let username = ''
  let password = ''

  // Generate random user name
  if (isRandom) {
    cy.generateUserPassword().then((val) => {
      username = val[0]
      password = val[1]

      return cy.loginWithUserNamePassword(username, password)
    })
  } else {
    // Use username specified in environment
    const userInfo = Cypress.env(defaultUserKey)
    username = userInfo.username
    password = userInfo.password

    return cy.loginWithUserNamePassword(username, password)
  }
})

/**
 * Usage: cy.expectPathname('/about')
 *
 * check the uri pathname
 */
Cypress.Commands.add('expectPathname', (pathname, options) =>
  cy.location('pathname', options).should((locationPathName) => expect(locationPathName).to.eq(pathname))
)

/**
 * Usage: cy.get('input[type=file]').uploadFile('upload.json_', 'text/json')
 *
 * Upload a file
 */
Cypress.Commands.add('uploadFile', { prevSubject: 'element' }, (subject, fileName, type) =>
  cy
    .fixture(fileName, 'hex')
    .then((fileHex) => {
      if (typeof fileHex !== 'string')
        throw "When uploading json rename your filetype to 'notjson'. See Cypress issue #7412"
      const bytes = hexStringToByteArray(fileHex)
      const file = new File([bytes], fileName, { type })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      subject.get(0).files = dataTransfer.files
      return subject
    })
    .trigger('change', { force: true })
)

function hexStringToByteArray(str) {
  return new Uint8Array(str.match(/.{2}|./g).map((s) => parseInt(s, 16)))
}

/**
 * Usage: cy.selectCountry('tax.country', 'United States')
 */
Cypress.Commands.add('selectCountry', (keyId, value) =>
  cy
    .get(`div[id="${keyId}"]`)
    .click()
    .get(`input[id="${keyId}"]`)
    .type(value + '{enter}')
)

/**
 * Usage: cy.selectState('tax.region', 'California')
 */
Cypress.Commands.add('selectState', (keyId, value) =>
  cy
    .get(`div[id="${keyId}"]`)
    // .findByAltText('tax.region')
    .click()
    // .findByAltText('tax.region')
    .get(`input[id="${keyId}"]`)
    .type(value + '{enter}')
)

Cypress.Commands.add('generateRandomJpg', () => {
  return new Cypress.Promise((resolve, reject) => {
    let imgGen = require('js-image-generator')

    imgGen.generateImage(50, 50, 50, function (err, image) {
      if (err) {
        reject(err)
      } else {
        resolve(image.data)
      }
    })
  })
})

Cypress.Commands.add('generateFeatureRandomJpg', (fileName) => {
  return cy.generateRandomJpg().then((randomImage) => {
    cy.writeFile('cypress/fixtures/' + fileName, randomImage, 'binary')
  })
})

Cypress.Commands.add('typeForce', { prevSubject: 'element' }, (subject, text, options) =>
  cy.wrap(subject).type(text, { force: true, ...options })
)