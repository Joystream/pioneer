import { Reducer } from './types/helpers'

export const isFunction = (something: unknown): something is CallableFunction => typeof something === 'function'

export const isDefined = <T extends any>(something: T | undefined): something is T => typeof something !== 'undefined'

export const isNumber = (something: unknown): something is number => typeof something === 'number'

export const isString = (something: unknown): something is string => typeof something === 'string'

export const isRecord = (something: unknown): something is Record<string, any> =>
  typeof something === 'object' && something !== null

interface EqualsOption {
  checkExtraKeys?: boolean
  depth?: boolean | number
}

export const objectEquals = <T extends Record<string, any>>(
  reference: T,
  { checkExtraKeys = false, depth = 1 }: EqualsOption = {}
): ((compared: T) => boolean) => {
  const equalsOption = { checkExtraKeys, depth: isNumber(depth) ? depth - 1 : depth }
  const expectedKeys: Array<keyof T> = Object.keys(reference)
  return (compared) =>
    (!checkExtraKeys || expectedKeys.length === Object.keys(compared).length) &&
    expectedKeys.every((key) => equals(compared[key], equalsOption)(reference[key]))
}

export const equals = <T extends any>(
  reference: T,
  { depth = 1, ...option }: EqualsOption = {}
): ((compared: T) => boolean) => {
  if (depth > 0 && isRecord(reference)) {
    const isEqual = objectEquals(reference, { depth, ...option })
    return (compared) => isRecord(compared) && isEqual(compared)
  } else {
    return (compared) => compared === reference
  }
}

export const intersperse = <T extends any, S extends any>(list: T[], separator: S): (T | S)[] =>
  list.length < 2 ? list : [list[0], ...list.slice(1).flatMap((item) => [separator, item])]

export const repeat = <T extends any>(getItem: (index: number) => T, times: number): T[] =>
  Array.from<T>({ length: times }).map((_, i) => getItem(i))

export const debounce = <T extends (...params: any[]) => any>(fn: T, delay = 400) => {
  type Result = (ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>) | undefined
  let latestTimeout: ReturnType<typeof setTimeout> | undefined

  return (...params: Parameters<T>) =>
    new Promise<Result>((resolve) => {
      const resolveImmediately = !latestTimeout

      const timeout = setTimeout(() => {
        if (timeout !== latestTimeout) {
          !resolveImmediately && resolve(undefined)
        } else {
          latestTimeout = undefined
          !resolveImmediately && resolve(fn(...params))
        }
      }, delay)
      latestTimeout = timeout

      resolveImmediately && resolve(fn(...params))
    })
}

export const last = <T extends any>(list: T[]): T => list[list.length - 1]

export const groupBy = <T extends any>(list: T[], predicate: (prev: T, item: T, index: number) => boolean): T[][] => {
  if (!list.length) return []

  const groupByReducer: Reducer<T[][], T> = ([[prev, ...restI1], ...rest], item, index) =>
    predicate(prev, item, index) ? [[item, prev, ...restI1], ...rest] : [[item], [prev, ...restI1], ...rest]

  const [first, ...rest] = list
  return rest.reduce(groupByReducer, [[first]]).reverse()
}

export const propsEquals = <T extends Record<string, any>>(...keys: (keyof T)[]) => (a: T, b: T) =>
  keys.every((key) => a[key] === b[key])
