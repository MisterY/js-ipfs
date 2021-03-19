'use strict'

/**
 * @param {import("../lib/core").ClientOptions} config
 */
module.exports = config => ({
  gc: require('./gc')(config),
  stat: require('./stat')(config),
  version: require('./version')(config)
})
