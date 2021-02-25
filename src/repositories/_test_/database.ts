import Knex from 'knex'
import path from 'path'

const inMemoryDB = Knex({
  client: 'sqlite3',
  connection: {
    filename: ':memory:'
  },
  migrations: {
    extension: 'ts',
    directory: path.resolve('src','resources', 'database', 'migrations')
  },
  useNullAsDefault: true,
  log: {
    warn: () => null
  }
})

export default inMemoryDB
