export * from './utils/bn'

import { Reducer } from './types/helpers'

type Obj = Record<string, any>

// Type guards

export const isDefined = <T extends any>(something: T | undefined): something is T => typeof something !== 'undefined'

export const isNumber = (something: unknown): something is number => typeof something === 'number'

export const isString = (something: unknown): something is string => typeof something === 'string'

export const isRecord = (something: unknown): something is Obj => typeof something === 'object' && something !== null

export const whenDefined = <T extends any, R>(something: T | undefined, fn: (something: T) => R): R | undefined => {
  if (isDefined(something)) return fn(something)
}

// Type Casting:

export const toNumber = (value: any): number => value?.toNumber?.() ?? (isNumber(value) ? value : NaN)

// Math:

export const clamp = (min: number, value: number, max: number) => Math.max(min, Math.min(max, value))

// Objects:

interface EqualsOption {
  checkExtraKeys?: boolean
  depth?: boolean | number
}

export const objectEquals = <T extends Obj>(
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
  if (depth && isRecord(reference)) {
    const isEqual = objectEquals(reference, { depth, ...option })
    return (compared) => isRecord(compared) && isEqual(compared)
  } else {
    return (compared) => compared === reference
  }
}

export const merge = <A extends Obj, B extends Obj = Partial<A>>(a: A, b: B): A & B => ({ ...a, ...b })

export const propsEquals =
  <T extends Obj>(...keys: (keyof T)[]) =>
  (a: T, b: T) =>
    keys.every((key) => a[key] === b[key])

export const definedValues = <T extends Record<any, any>>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).flatMap(([key, value]) => (isDefined(value) ? [[key, value]] : []))) as T

// Lists:

export const dedupeObjects = <T extends Obj>(list: T[], options?: EqualsOption): T[] =>
  list.reduce((remain: T[], item) => [...remain, ...(remain.some(objectEquals(item, options)) ? [] : [item])], [])

export const intersperse = <T extends any, S extends any>(
  list: T[],
  toSeparator: (index: number, list: T[]) => S
): (T | S)[] =>
  list.length < 2 ? list : [list[0], ...list.slice(1).flatMap((item, index) => [toSeparator(index, list), item])]

export const partition = <T extends any>(list: T[], predicate: (x: T) => boolean): [T[], T[]] =>
  list.reduce(
    ([pass, fail]: [T[], T[]], item): [T[], T[]] =>
      predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]],
    [[], []]
  )

export const repeat = <T extends any>(getItem: (index: number) => T, times: number): T[] =>
  Array.from({ length: times }, (_, i) => getItem(i))

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

export const last = <T extends any>(list: ArrayLike<T>): T => list[list.length - 1]
export const flatten = <T extends any>(nested: (T | T[])[]) => ([] as T[]).concat(...nested)

export const groupBy = <T extends any>(list: T[], predicate: (prev: T, item: T, index: number) => boolean): T[][] => {
  if (!list.length) return []

  const groupByReducer: Reducer<T[][], T> = ([[prev, ...restI1], ...rest], item, index) =>
    predicate(prev, item, index) ? [[item, prev, ...restI1], ...rest] : [[item], [prev, ...restI1], ...rest]

  const [first, ...rest] = list
  return rest.reduce(groupByReducer, [[first]]).reverse()
}

export const asArray = <T extends any>(item: undefined | T): T[] => (isDefined(item) ? [item] : [])

type Item = Record<string, any>

export const arrayGroupBy = (items: Item[], key: keyof Item) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )

// Promises:

type MapperP<T, R> = (value: T, index: number, array: T[] | readonly T[]) => Promise<R>
export const mapP = <T, R>(list: T[] | readonly T[], mapper: MapperP<T, R>): Promise<R[]> =>
  Promise.all(list.map(mapper))

export const flatMapP = async <T, R>(list: T[] | readonly T[], mapper: MapperP<T, R | R[]>): Promise<R[]> =>
  Promise.all(flatten(await mapP(list, mapper)))
