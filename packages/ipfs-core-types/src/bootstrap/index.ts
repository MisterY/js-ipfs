import type { AbortOptions } from '../basic'
import type Multiaddr from 'multiaddr'

export interface API<OptionExtension = {}> {
  add: (addr: Multiaddr, options?: AbortOptions & OptionExtension) => Promise<{ Peers: Multiaddr[] }>
  reset: (options?: AbortOptions & OptionExtension) => Promise<{ Peers: Multiaddr[] }>
  list: (options?: AbortOptions & OptionExtension) => Promise<{ Peers: Multiaddr[] }>
  rm: (addr: Multiaddr, options?: AbortOptions & OptionExtension) => Promise<{ Peers: Multiaddr[] }>
  clear: (options?: AbortOptions & OptionExtension) => Promise<{ Peers: Multiaddr[] }>
}
