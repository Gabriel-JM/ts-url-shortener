import Knex from 'knex'
import path from 'path'

export function connectDatabase() {
  const dbConfig = <Knex.Config> {
    client: 'postgresql',
    connection: process.env.DB_URL,
    migrations: {
      extension: 'ts',
      directory: path.join(__dirname, 'migrations')
    }
  }

  return Knex(dbConfig)
}
