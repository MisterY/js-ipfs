'use strict'

const configure = require('../lib/configure')
const toUrlSearchParams = require('../lib/to-url-search-params')

/**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/swarm').API<HTTPClientExtraOptions>} SwarmAPI
 */

module.exports = configure(api => {
  /**
   * @type {SwarmAPI["connect"]}
   */
  async function connect (addrs, options = {}) {
    addrs = Array.isArray(addrs) ? addrs : [addrs]

    const res = await api.post('swarm/connect', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: addrs.map(addr => `${addr}`),
        ...options
      }),
      headers: options.headers
    })
    const { Strings } = await res.json()

    return Strings || []
  }
  return connect
})
