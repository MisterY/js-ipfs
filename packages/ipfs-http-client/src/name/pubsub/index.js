'use strict'

/**
 * @param {import("../../lib/core").ClientOptions} config
 */
module.exports = config => ({
  cancel: require('./cancel')(config),
  state: require('./state')(config),
  subs: require('./subs')(config)
})
