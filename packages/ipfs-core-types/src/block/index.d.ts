import { AbortOptions, PreloadOptions } from '../basic'
import CID, { CIDVersion } from 'cids'
import Block from 'ipld-block'
import { CodecName } from 'multicodec'
import { HashName } from 'multihashes'

export interface API<OptionExtension = {}> {
  get: (cid: CID | string | Uint8Array, options?: AbortOptions & PreloadOptions & OptionExtension) => Promise<Block>
  put: (block: Block | Uint8Array, options?: PutOptions & OptionExtension) => Promise<Block>
  rm: (cid: CID | CID[], options?: RmOptions & OptionExtension) => AsyncIterable<RmResult>
  stat: (ipfsPath: IPFSPath, options?: AbortOptions & PreloadOptions & OptionExtension) => Promise<StatResult>
}

export interface PutOptions extends AbortOptions, PreloadOptions {
  /**
   *  CID to store the block under - ignored if a Block is passed
   */
  cid?: CID

  /**
   * The codec to use to create the CID
   */
  format?: CodecName

  /**
   * Multihash hashing algorithm to use. (Defaults to 'sha2-256')
   */
  mhtype?: HashName

  /**
   * @deprecated
   */
  mhlen?: any

  /**
   * The version to use to create the CID
   */
  version?: CIDVersion

  /**
   * Pin this block when adding. (Defaults to `false`)
   */
  pin?: boolean
}

export interface RmOptions extends AbortOptions {
  /**
   * Ignores nonexistent blocks
   */
  force?: boolean,

  /**
   * Do not return output if true
   */
  quiet?: boolean
}

export interface RmResult extends AbortOptions {
  /**
   * The CID of the removed block
   */
  cid: CID

  /**
   * Any error that occured while trying to remove the block
   */
  error?: Error
}

export interface StatResult {
  /**
   * The CID of the block
   */
  cid: CID

  /**
   * The size of the block
   */
  size: number
}
