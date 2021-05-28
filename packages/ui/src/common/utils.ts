export const isFunction = (something: unknown): something is CallableFunction => typeof something === 'function'

export const isDefined = <T extends any>(something: T | undefined): something is T => typeof something !== 'undefined'

export const isNumber = (something: unknown): something is number => typeof something === 'number'

export const objectShallowContains = <T extends { [k: string]: any }>(contained: T): ((container: T) => boolean) => {
  const containedKeys: Array<keyof T> = Object.keys(contained)
  return (container) => containedKeys.every((key) => container[key] === contained[key])
}

type Indexer<T> = (item: T, index: number) => string
export const indexList = <T extends any>(list: T[], itemToKey = ((item) => item) as Indexer<T>) =>
  Object.fromEntries(list.map((item, index) => [itemToKey(item, index), item]))
