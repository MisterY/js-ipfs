import type { AbortOptions } from '../basic'

export interface API<OptionExtension = {}> {
  gen: (name: string, options?: GenOptions & OptionExtension) => Promise<Key>
  list: (options?: AbortOptions & OptionExtension) => Promise<Key[]>
  rm: (name: string, options?: AbortOptions & OptionExtension) => Promise<Key>
  rename: (oldName: string, newName: string, options?: AbortOptions & OptionExtension) => Promise<RenameKeyResult>
  export: (name: string, password: string, options?: AbortOptions & OptionExtension) => Promise<string>
  import: (name: string, pem: string, password: string, options?: AbortOptions & OptionExtension) => Promise<Key>
  info: (name: string, options?: AbortOptions & OptionExtension) => Promise<Key>
}

export interface GenOptions extends AbortOptions {
  type: string
  size: number
}

export interface Key {
  id: string
  name: key
}

export interface RenameKeyResult {
  id: string
  was: string
  now: string
  overwrite: boolean
}
