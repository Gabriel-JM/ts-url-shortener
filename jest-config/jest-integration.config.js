const jestConfig = require('./base-config')
jestConfig.testMatch = ['<rootDir>/**/*.test.ts']

module.exports = jestConfig
