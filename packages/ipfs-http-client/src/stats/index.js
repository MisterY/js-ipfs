'use strict'

/**
 * @param {import("../lib/core").ClientOptions} config
 */
module.exports = config => ({
  bitswap: require('../bitswap/stat')(config),
  bw: require('./bw')(config),
  repo: require('../repo/stat')(config)
})
