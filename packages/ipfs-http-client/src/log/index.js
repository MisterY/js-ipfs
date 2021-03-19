'use strict'

/**
 * @param {import("../lib/core").ClientOptions} config
 */
module.exports = config => ({
  tail: require('./tail')(config),
  ls: require('./ls')(config),
  level: require('./level')(config)
})
