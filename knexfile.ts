import 'dotenv-safe/config'
import Knex from 'knex'
import path from 'path'

const dbFileName = process.env.NODE_ENV === 'test'
  ? 'test.db'
  : 'url-shortener.db'

module.exports = <Knex.Config> {
  client: 'sqlite3',
  connection: {
    filename: path.resolve('src', 'resources', 'database', dbFileName),
    charset: 'utf8'
  },
  migrations: {
    extension: 'ts',
    directory: path.resolve('src', 'resources', 'database', 'migrations')
  },
  useNullAsDefault: true,
  log: {
    warn: () => null
  }
}
