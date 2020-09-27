export function getAdminAccount() {
  return {
    username: Cypress.env('adminUsername'),
    password: Cypress.env('adminPassword'),
  }
}

export function getDBConfig() {
  return {
    client: Cypress.env('dbClient'),
    connection: Cypress.env('dbConnection'),
  }
}
