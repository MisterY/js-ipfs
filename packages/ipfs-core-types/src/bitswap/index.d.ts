import type BigInteger from 'bignumber.js'
import type PeerId from 'peer-id'
import type CID from 'cids'
import type { AbortOptions } from '../basic'

export interface API<OptionExtension = {}> {
  wantlist: (options?: AbortOptions & OptionExtension) => Promise<CID[]>
  wantlistForPeer: (peerId, options?: AbortOptions & OptionExtension) => Promise<CID[]>
  unwant: (cids: CID | CID[], options?: AbortOptions & OptionExtension) => Promise<void>
  stat: (options?: AbortOptions & OptionExtension) => Promise<Stats>
}

export interface Stats {
  provideBufLen: number
  wantlist: CID[]
  peers: CID[]
  blocksReceived: BigInteger
  dataReceived: BigInteger
  blocksSent: BigInteger
  dataSent: BigInteger
  dupBlksReceived: BigInteger
  dupDataReceived: BigInteger
}
