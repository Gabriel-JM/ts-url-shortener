const jestConfig = require('./base-config')
jestConfig.testMatch = ['<rootDir>/**/*.spec.ts']

module.exports = jestConfig
