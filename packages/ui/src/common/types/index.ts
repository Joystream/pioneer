export * from './Activity'
export * from './Block'

export type Address = string
export type EmptyObject = Record<string, never>

export type AnyKeys = {
  [key in string | number]: any
}

export type AnyObject = Record<any, any>
