import { AnyObject } from '../types'

export interface RecursiveProxyHandler<T extends AnyObject> extends Omit<ProxyHandler<T>, 'get'> {
  get(params: { target: T; path: string[]; value: any; property: string }): any
  default?(params: { target: T; path: string[]; value: any; property: string }): any
}

export const recursiveProxy = <T extends AnyObject>(
  value: T,
  handler: RecursiveProxyHandler<T>,
  path: string[] = [],
  target = value
): T =>
  typeof value !== 'object' && typeof value !== 'function'
    ? value
    : new Proxy(value, {
        // TODO implement other handler methods with a path
        get(_, property: string) {
          const nextPath = [...path, property]
          const nextValue = handler.get({ target, path: nextPath, value, property })
          return handler.default && typeof nextValue === 'undefined'
            ? handler.default({ target, path: nextPath, value, property })
            : recursiveProxy(nextValue, handler, nextPath, target)
        },
      })
