export * from './Activity'
export * from './Block'

export type Address = string
export type EmptyObject = Record<string, never>

export type AnyKeys = {
  [key in string | number]: any
}

export type AnyObject = Record<any, any>

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
