import { isObject, isString } from 'lodash'

export * from './email'
export * from './query-node'

export const count = (x: any[]) => x.length

export const errorMessage = (err: any, defaultMessage = 'Unknown error!') =>
  (isObject(err) && (err as Error).message) || (isString(err) && err) || defaultMessage
