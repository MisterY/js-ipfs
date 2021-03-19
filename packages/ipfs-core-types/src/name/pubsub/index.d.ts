import CID from 'cids';
import type { AbortOptions } from '../../basic'

export interface API<OptionExtension = {}> {
  cancel: (name: string, options?: AbortOptions & OptionExtension) => Promise<PubsubCancelResult>
  state: (options?: AbortOptions & OptionExtension) => Promise<PubsubStateResult>
  subs: (options?: AbortOptions & OptionExtension) => Promise<string[]>
}

export interface PubsubCancelResult {
  canceled: boolean
}

export interface PubsubStateResult {
  enabled: boolean
}
