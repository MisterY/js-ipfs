'use strict'

const Remote = require('./remote')

/**
 * @param {import("../lib/core").ClientOptions} config
 */
module.exports = config => ({
  add: require('./add')(config),
  addAll: require('./add-all')(config),
  ls: require('./ls')(config),
  rm: require('./rm')(config),
  rmAll: require('./rm-all')(config),
  remote: new Remote(config)
})
