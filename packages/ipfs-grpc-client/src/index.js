'use strict'

const toUrlString = require('ipfs-core-utils/src/to-url-string')
const loadServices = require('./utils/load-services')
const { grpc } = require('@improbable-eng/grpc-web')

const service = loadServices()

/** @type {Record<string, string>} */
const protocols = {
  'ws://': 'http://',
  'wss://': 'https://'
}

/**
 * @param {{ url: string }} opts
 */
function normaliseUrls (opts) {
  Object.keys(protocols).forEach(protocol => {
    if (opts.url.startsWith(protocol)) {
      opts.url = protocols[protocol] + opts.url.substring(protocol.length)
    }
  })
}

/**
 * @param {import('./types').Options} [opts]
 */
module.exports = function createClient (opts = { url: '' }) {
  opts.url = toUrlString(opts.url)

  // @improbable-eng/grpc-web requires http:// protocol URLs, not ws://
  normaliseUrls(opts)

  const client = {
    // @ts-ignore - TODO: fix after https://github.com/ipfs/js-ipfs/issues/3594
    addAll: require('./core-api/add-all')(grpc, service.Root.add, opts),
    // @ts-ignore - TODO: fix after https://github.com/ipfs/js-ipfs/issues/3594
    id: require('./core-api/id')(grpc, service.Root.id, opts),
    files: {
      // @ts-ignore - TODO: fix after https://github.com/ipfs/js-ipfs/issues/3594
      ls: require('./core-api/files/ls')(grpc, service.MFS.ls, opts),
      // @ts-ignore - TODO: fix after https://github.com/ipfs/js-ipfs/issues/3594
      write: require('./core-api/files/write')(grpc, service.MFS.write, opts)
    }
  }

  return client
}
