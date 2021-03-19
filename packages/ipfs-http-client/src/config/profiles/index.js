'use strict'

/**
 * @param {import("../../lib/core").ClientOptions} config
 */
module.exports = config => ({
  apply: require('./apply')(config),
  list: require('./list')(config)
})
