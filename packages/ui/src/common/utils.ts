export const isFunction = (something: unknown): something is CallableFunction => typeof something === 'function'

export const isDefined = <T extends any>(something: T | undefined): something is T => typeof something !== 'undefined'

export const isNumber = (something: unknown): something is number => typeof something === 'number'

export const isString = (something: unknown): something is string => typeof something === 'string'

export const isRecord = (something: unknown): something is Record<string, any> =>
  typeof something === 'object' && something !== null

interface EqualsOption {
  checkExtraKeys?: boolean
  deep?: boolean
}

export const objectEquals = <T extends Record<string, any>>(
  reference: T,
  { checkExtraKeys = false, deep = false }: EqualsOption = {}
): ((compared: T) => boolean) => {
  const expectedKeys: Array<keyof T> = Object.keys(reference)
  return (compared) =>
    (!checkExtraKeys || expectedKeys.length === Object.keys(compared).length) &&
    expectedKeys.every((key) => (deep ? equals(compared[key])(reference[key]) : compared[key] === reference[key]))
}

export const equals = <T extends any>(reference: T, options: EqualsOption = {}): ((compared: T) => boolean) =>
  isRecord(reference)
    ? (objectEquals(reference, options) as (compared: T) => boolean)
    : (compared: T) => compared === reference

export const intersperse = <T extends any, S extends any>(list: T[], separator: S): (T | S)[] =>
  list.length < 2 ? list : [list[0], ...list.slice(1).flatMap((item) => [separator, item])]
