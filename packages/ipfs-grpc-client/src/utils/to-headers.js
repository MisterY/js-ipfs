'use strict'

const { paramCase } = require('change-case')
const { grpc: { Metadata } } = require('@improbable-eng/grpc-web')

/**
 * @param {Record<string, any>} [object] - key/value pairs to turn into HTTP headers
 **/
module.exports = (object = {}) => {
  const output = new Metadata()

  Object.keys(object || {}).forEach(key => {
    if (typeof object[key] === 'function') {
      return
    }

    output.set(paramCase(key), object[key])
  })

  return output
}
