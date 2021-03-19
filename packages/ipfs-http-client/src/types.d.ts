// This file contains some utility types that either can't be expressed in
// JSDoc syntax or that result in a different behaviour when typed in JSDoc.

export interface HTTPClientExtraOptions {
  headers?: Record<string, string>
  searchParams?: URLSearchParams
}

export interface EndpointConfig {
  host: string,
  port: string,
  protocol: string,
  pathname: string
  'api-path': string
}
