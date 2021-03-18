import { AbortOptions, IPFSPath } from '../basic'
import { ToMTime } from './files'
import CID, { CIDVersion } from 'cids'
import { CodecName } from 'multicodec'
import { HashName } from 'multihashes'
import { Mtime } from 'ipfs-unixfs'

export interface API<OptionExtension = {}> {
  chmod: (path: string, mode: number | string, options?: ChmodOptions & OptionExtension) => Promise<void>
  cp: (from: IPFSPath | IPFSPath[], to: string, options?: CpOptions & OptionExtension) => Promise<void>
  mkdir: (path: string, options?: MkdirOptions & OptionExtension) => Promise<void>
  stat: (ipfsPath: IPFSPath, options?: StatOptions & OptionExtension) => Promise<StatResult>
  touch: (ipfsPath: string, options?: TouchOptions & OptionExtension) => Promise<void>
  rm: (ipfsPaths: string | string[], options?: RmOptions & OptionExtension) => Promise<void>
  read: (ipfsPath: IPFSPath, options?: ResolveOptions & OptionExtension) => AsyncIterable<Uint8Array>
  write: (ipfsPath: string, content: string | Uint8Array | Blob | AsyncIterable<Uint8Array> | Iterable<Uint8Array>, options?: WriteOptions & OptionExtension) => Promise<void>
  mv: (from: string | string[], to: string, options?: MvOptions & OptionExtension) => Promise<void>
  flush: (ipfsPath: string, options?: AbortOptions & OptionExtension) => Promise<CID>
  ls: (ipfsPath: IPFSPath, options?: AbortOptions & OptionExtension) => AsyncIterable<MFSEntry>
}

export interface MFSEntry {
  /**
   * The object's name
   */
  name: string

  /**
   * The object's type (directory or file)
   */
  type: 'directory' | 'file'

  /**
   * The size of the file in bytes
   */
  size: number

  /**
   * The CID of the object
   */
  cid: CID

  /**
   * The UnixFS mode as a Number
   */
  mode?: number

  /**
   * An object with numeric secs and nsecs properties
   */
  mtime?: Mtime
}

export interface MFSOptions {
  /**
   * If true the changes will be immediately flushed to disk
   */
  flush?: boolean
}

export interface ChmodOptions extends MFSOptions, AbortOptions {
  /**
   * If true mode will be applied to the entire tree under path
   */
  recursive?: boolean

  /**
   * The hash algorithm to use for any updated entries
   */
  hashAlg?: HashName

  /**
   * The CID version to use for any updated entries
   */
  cidVersion?: CIDVersion
}

export interface CpOptions extends MFSOptions, AbortOptions {
  /**
   * The value or node that was fetched during the get operation
   */
  parents?: boolean

  /**
   * The hash algorithm to use for any updated entries
   */
  hashAlg?: HashName

  /**
   * The CID version to use for any updated entries
   */
  cidVersion?: CIDVersion

  /**
   * The threshold for splitting any modified folders into HAMT shards
   */
  shardSplitThreshold?: number
}

export interface MkdirOptions extends MFSOptions, AbortOptions {
  /**
   * If true, create intermediate directories
   */
  parents?: boolean

  /**
   * An integer that represents the file mode
   */
  mode?: number

  /**
   * A Date object, an object with { secs, nsecs } properties where secs is the number of seconds since (positive) or before (negative) the Unix Epoch began and nsecs is the number of nanoseconds since the last full second, or the output of process.hrtime()
   */
  mtime?: ToMTime

  /**
   * The hash algorithm to use for any updated entries
   */
  hashAlg?: HashName

  /**
   * The CID version to use for any updated entries
   */
  cidVersion?: CIDVersion

  /**
   * The threshold for splitting any modified folders into HAMT shards
   */
  shardSplitThreshold?: number
}

export interface StatOptions extends AbortOptions {
  /**
   * If true, return only the CID
   */
  hash?: boolean

  /**
   * If true, return only the size
   */
  size?: boolean

  /**
   * If true, compute the amount of the DAG that is local and if possible the total size
   */
  withLocal?: boolean
}

export interface StatResult {
  /**
   * A CID instance
   */
  cid: CID

  /**
   * The file size in Bytes
   */
  size: number

  /**
   * The size of the DAGNodes making up the file in Bytes
   */
  cumulativeSize: number

  /**
   * Either directory or file
   */
  type: 'directory' | 'file'

  /**
   * If type is directory, this is the number of files in the directory. If it is file it is the number of blocks that make up the file
   */
  blocks: number

  /**
   * Indicates if locality information is present
   */
  withLocality: boolean

  /**
   * Indicates if the queried dag is fully present locally
   */
  local?: boolean

  /**
   * Indicates the cumulative size of the data present locally
   */
  sizeLocal?: number

  /**
   * UnixFS mode if applicable
   */
  mode?: number

  /**
   * UnixFS mtime if applicable
   */
  mtime?: Mtime
}

export interface TouchOptions extends MFSOptions, AbortOptions {
  /**
   * A Date object, an object with { secs, nsecs } properties where secs is the number of seconds since (positive) or before (negative) the Unix Epoch began and nsecs is the number of nanoseconds since the last full second, or the output of process.hrtime()
   */
  mtime?: ToMTime

  /**
   * The hash algorithm to use for any updated entries
   */
  hashAlg?: HashName

  /**
   * The CID version to use for any updated entries
   */
  cidVersion?: CIDVersion
}

export interface RmOptions extends MFSOptions, AbortOptions {
  /**
   * If true all paths under the specifed path(s) will be removed
   */
  recursive?: boolean

  /**
   * The hash algorithm to use for any updated entries
   */
  hashAlg?: HashName

  /**
   * The CID version to use for any updated entries
   */
  cidVersion?: CIDVersion

  /**
   * The threshold for splitting any modified folders into HAMT shards
   */
  shardSplitThreshold?: number
}

export interface ReadOptions extends AbortOptions {
  /**
   * An offset to start reading the file from
   */
  offset?: number

  /**
   * An optional max length to read from the file
   */
  length?: number
}

export interface WriteOptions extends MFSOptions, AbortOptions {
  /**
   * An offset within the file to start writing at
   */
  offset?: number

  /**
   * Optionally limit how many bytes are written
   */
  length?: number

  /**
   * Create the MFS path if it does not exist
   */
  create?: boolean

  /**
   * Create intermediate MFS paths if they do not exist
   */
  parents?: boolean

  /**
   * Truncate the file at the MFS path if it would have been larger than the passed content
   */
  truncate?: boolean

  /**
   * If true, DAG leaves will contain raw file data and not be wrapped in a protobuf
   */
  rawLeaves?: boolean

  /**
   * An integer that represents the file mode
   */
  mode?: number

  /**
   * A Date object, an object with { secs, nsecs } properties where secs is the number of seconds since (positive) or before (negative) the Unix Epoch began and nsecs is the number of nanoseconds since the last full second, or the output of process.hrtime()
   */
  mtime?: ToMTime

  /**
   * The hash algorithm to use for any updated entries
   */
  hashAlg?: HashName

  /**
   * The CID version to use for any updated entries
   */
  cidVersion?: CIDVersion

  /**
   * The threshold for splitting any modified folders into HAMT shards
   */
  shardSplitThreshold?: number
}

export interface MvOptions extends  extends MFSOptions, AbortOptions {
  /**
   * Create intermediate MFS paths if they do not exist
   */
  parents?: boolean

  /**
   * The hash algorithm to use for any updated entries
   */
  hashAlg?: HashName

  /**
   * The CID version to use for any updated entries
   */
  cidVersion?: CIDVersion

  /**
   * The threshold for splitting any modified folders into HAMT shards
   */
  shardSplitThreshold?: number
}
