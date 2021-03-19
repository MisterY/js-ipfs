'use strict'

/**
 * @param {import("../lib/core").ClientOptions} config
 */
module.exports = config => ({
  publish: require('./publish')(config),
  resolve: require('./resolve')(config),
  pubsub: require('./pubsub')(config)
})
