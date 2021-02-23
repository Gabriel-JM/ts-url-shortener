import Knex from 'knex'

module.exports = {
  development: <Knex.Config> {
    client: 'pg',    
    connection: '',
    migrations: {
      extension: 'ts',
      directory: './src/resources/database/migrations'
    }
  },

  testing: <Knex.Config> {
    client: 'pg',
    connection: '',
    migrations: {
      extension: 'ts',
      directory: './src/resources/database/migrations'
    }
  }
}
