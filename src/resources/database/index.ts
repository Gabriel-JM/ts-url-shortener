import Knex from 'knex'
import path from 'path'

const dbFileName = process.env.NODE_ENV === 'test'
  ? 'test.db'
  : 'url-shortener.db'

export function connectDatabase() {
  const dbConfig = <Knex.Config> {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, dbFileName),
      charset: 'utf8'
    },
    migrations: {
      extension: 'ts',
      directory: path.join(__dirname, 'migrations')
    },
    useNullAsDefault: true,
    log: {
      warn: () => null
    }
  }

  return Knex(dbConfig)
}
