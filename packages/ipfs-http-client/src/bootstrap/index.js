'use strict'

/**
 * @param {import("../lib/core").ClientOptions} config
 */
module.exports = config => ({
  add: require('./add')(config),
  clear: require('./clear')(config),
  rm: require('./rm')(config),
  reset: require('./reset')(config),
  list: require('./list')(config)
})
