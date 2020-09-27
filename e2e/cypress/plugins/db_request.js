const mapKeys = require('lodash.mapkeys')

function convertKeysToLowercase(obj) {
  return mapKeys(obj, (_, k) => {
    return k.toLowerCase()
  })
}

function getKnexClient({ client, connection }) {
  return require('knex')({ client, connection }) // eslint-disable-line global-require
}

// Reuse DB client connection
let knexClient

const dbGetUser = async ({ dbConfig, params: { username } }) => {
  if (!knexClient) {
    knexClient = getKnexClient(dbConfig)
  }

  try {
    const user = await knexClient(toLowerCase(dbConfig, 'Users')).where('username', username).first()

    return { user: convertKeysToLowercase(user) }
  } catch (error) {
    return { errorMessage: 'Failed to get a user from the database' }
  }
}

module.exports = {
  dbGetUser,
}
