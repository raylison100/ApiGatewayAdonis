'use strict'

const Env     = use('Env')
const Helpers = use('Helpers')

module.exports = {

  connection: Env.get('DB_CONNECTION', 'mongodb'),

  mongodb: {
    client: 'mongodb',
    connectionString: Env.get('DB_CONNECTION_STRING', ''),
    connection: {
      host: Env.get('DB_HOST', 'mongo'),
      port: Env.get('DB_PORT', 27017),
      username: Env.get('DB_USER', ''),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'crawler'),
    }
  }
}
