require('dotenv-safe/config')

process.env.DB_URL = 'postgresql://postgres:postgres@localhost/url_shortener_test'

module.exports = {
  rootDir: '../src',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/**/*.(spec|test).ts'],
  testEnvironment: 'node',
  coverageDirectory: '../coverage'
}
