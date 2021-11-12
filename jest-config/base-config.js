require('dotenv-safe/config')

process.env.DB_URL = 'postgresql://postgres:postgres@localhost/url_shortener_test'

module.exports = {
  rootDir: '../src',
  testMatch: ['<rootDir>/**/*.(spec|test).ts'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coverageDirectory: '../coverage'
}
