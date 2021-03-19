'use strict'

const multiaddr = require('multiaddr')
const configure = require('../lib/configure')
const toUrlSearchParams = require('../lib/to-url-search-params')

/**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/swarm').API<HTTPClientExtraOptions>} SwarmAPI
 */

module.exports = configure(api => {
  /**
   * @type {SwarmAPI["peers"]}
   */
  async function peers (options = {}) {
    const res = await api.post('swarm/peers', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })

    /** @type {{ Peers: { Peer: string, Addr: string, Muxer?: string, Latency?: string, Streams?: string[], Direction?: 0 | 1 }[] }} */
    const { Peers } = await res.json()

    return (Peers || []).map(peer => {
      const info = {}
      try {
        info.addr = multiaddr(peer.Addr)
        info.peer = peer.Peer
      } catch (error) {
        info.error = error
        info.rawPeerInfo = peer
      }
      if (peer.Muxer) {
        info.muxer = peer.Muxer
      }
      if (peer.Latency) {
        info.latency = peer.Latency
      }
      if (peer.Streams) {
        info.streams = peer.Streams
      }
      if (peer.Direction != null) {
        info.direction = peer.Direction
      }
      return info
    })
  }
  return peers
})
