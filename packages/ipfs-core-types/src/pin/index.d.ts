import type { AbortOptions, AwaitIterable } from '../basic'
import type CID from 'cids'
import type { API as remote } from './remote'

export interface API<OptionExtension = {}> {
  add: (cid: string | CID, options?: AddOptions & OptionExtension) => Promise<CID>
  addAll: (source: AwaitIterable<AddInput>, options?: AddAllOptions & OptionExtension) => AsyncIterable<CID>
  ls: (options?: LsOptions & OptionExtension) => AsyncIterable<LsResult>
  rm: (ipfsPath: string | CID, options?: RmOptions & OptionExtension) => Promise<CID>
  rmAll: (source: AwaitIterable<RmAllInput>, options?: AbortOptions & OptionExtension) => AsyncIterable<CID>

  remote
}

export interface AddOptions extends AbortOptions {
  /**
   * If true, pin all blocked linked to from the pinned CID
   */
  recursive?: boolean

  /**
   * Whether to preload all blocks pinned during this operation
   */
  preload?: boolean

  /**
   * Internal option used to control whether to create a repo write lock during a pinning operation
   */
  lock?: boolean
}

export interface AddAllOptions extends AbortOptions {
  lock?: boolean

  /**
   * Whether to preload all blocks pinned during this operation
   */
  preload?: boolean

  /**
   * Internal option used to control whether to create a repo write lock during a pinning operation
   */
  lock?: boolean
}

export interface AddInput {
  /**
   * A CID to pin - nb. you must pass either `cid` or `path`, not both
   */
  cid?: CID

  /**
   * An IPFS path to pin - nb. you must pass either `cid` or `path`, not both
   */
  path?: string

  /**
   * If true, pin all blocked linked to from the pinned CID
   */
  recursive?: boolean

  /**
   * A human readable string to store with this pin
   */
  comments?: string
}

export type PinType = 'recursive' | 'direct' | 'indirect' | 'all'

export type PinQueryType = 'recursive' | 'direct' | 'indirect' | 'all'

export interface LsOptions  extends AbortOptions {
  paths?: CID | CID[] | string | string[]
  type?: PinQueryType
}

export interface LsResult {
  cid: CID
  type: PinType | string
  metadata?: Record<string, any>
}

export interface RmOptions extends AbortOptions {
  recursive?: boolean
}

export interface RmAllInput {
  cid?: CID
  path?: string
  recursive?: boolean
}

