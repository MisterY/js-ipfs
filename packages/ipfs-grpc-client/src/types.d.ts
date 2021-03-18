import { agent as HttpAgent } from 'http'
import { agent as HttpsAgent } from 'https'

export interface Options {
  url: string
  agent?: HttpAgent | HttpsAgent
}

export interface RPCOptions<Metadata> {
  host: string
  debug?: boolean
  metadata: Metadata
  agent?: HttpAgent | HttpsAgent
}
