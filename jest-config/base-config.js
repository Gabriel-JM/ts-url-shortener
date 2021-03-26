require('dotenv-safe/config')

module.exports = {
  rootDir: '../src',
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage'
}
