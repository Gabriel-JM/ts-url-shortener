import 'dotenv-safe/config'
import Knex from 'knex'

module.exports = <Knex.Config> {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: 'ts',
    directory: './src/resources/database/migrations'
  }
}
