import { AnyObject } from '../types'

type ObjTransformParams = Map<any, any> | Set<any> | Iterable<any> | AnyObject | any
type ObjTransform<T extends ObjTransformParams> = (x: T, key?: string | number, context?: AnyObject) => T

export const mapObject = (obj: AnyObject, transform: ObjTransform<ObjTransformParams>): AnyObject => {
  if (obj instanceof Map) {
    return new Map(mapEntries(Array.from(obj), transform))
  } else if (obj instanceof Set) {
    return new Set(transform(Array.from(obj)))
  } else if (isIterable(obj)) {
    return Array.from(obj, transform)
  } else {
    return Object.fromEntries(mapEntries(Object.entries(obj), transform, obj))
  }
}

const isIterable = (value: any): value is Iterable<any> => typeof value[Symbol.iterator] === 'function'

const mapEntries = (
  entries: [any, any][],
  transform: (x: any, key?: string | number, context?: AnyObject) => any,
  context?: AnyObject
): [any, any][] => entries.map(([key, value]) => [key, transform(value, key, context)])
