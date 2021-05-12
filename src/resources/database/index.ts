import Knex from 'knex'
import path from 'path'

export function connectDatabase() {
  const dbConfig = <Knex.Config> {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'url-shortener.db'),
      charset: 'utf8'
    },
    migrations: {
      extension: 'ts',
      directory: path.join(__dirname, 'migrations')
    }
  }

  return Knex(dbConfig)
}
