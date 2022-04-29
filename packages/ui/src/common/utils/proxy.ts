import { AnyObject } from '../types'

export interface RecursiveProxyHandler<T extends AnyObject> extends Omit<ProxyHandler<T>, 'get'> {
  get(target: T, path: string[]): any
}

export const recursiveProxy = <T extends AnyObject>(
  target: T,
  handler: RecursiveProxyHandler<T>,
  path: string[] = []
): T =>
  typeof target !== 'object' && typeof target !== 'function'
    ? target
    : new Proxy(target, {
        // TODO implement other handler methods with a path
        get(target, p: string) {
          const nextPath = [...path, p]
          return recursiveProxy(handler.get(target, nextPath), handler, nextPath)
        },
      })
