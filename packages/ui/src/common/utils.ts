export const isFunction = (something: unknown): something is CallableFunction => typeof something === 'function'

export const isDefined = <T extends any>(something: T | undefined): something is T => typeof something !== 'undefined'

export const isNumber = (something: unknown): something is number => typeof something === 'number'

export const isString = (something: unknown): something is string => typeof something === 'string'

export const isRecord = (something: unknown): something is Record<string, any> =>
  typeof something === 'object' && something !== null

export const objectEquals = <T extends Record<string, any>>(
  reference: T,
  checkExtraKeys = false
): ((compared: T) => boolean) => {
  const expectedKeys: Array<keyof T> = Object.keys(reference)
  return (compared) =>
    (!checkExtraKeys || expectedKeys.length === Object.keys(compared).length) &&
    expectedKeys.every((key) => compared[key] === reference[key])
}

export const equals = <T extends any>(reference: T, checkExtraKeys = false): ((compared: T) => boolean) =>
  isRecord(reference)
    ? (objectEquals(reference, checkExtraKeys) as (compared: T) => boolean)
    : (compared: T) => compared === reference

export const intersperse = <T extends any, S extends any>(list: T[], separator: S): (T | S)[] =>
  list.length < 2 ? list : [list[0], ...list.slice(1).flatMap((item) => [separator, item])]
