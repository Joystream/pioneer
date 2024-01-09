import { useEffect, useMemo, useRef, useState } from 'react'
import { Observable } from 'rxjs'

export const useObservableArray = <T, R>(
  initial: T[] | undefined,
  asObservable: (item: T) => Observable<R> | undefined,
  options: { skip: boolean; key?: keyof T }
): R[] | undefined => {
  const cache = useRef(new Map<any, Observable<R>>())
  const [result, setResult] = useState<R[]>()

  const observables = useMemo(() => {
    if (options.skip || !initial) return
    return initial.flatMap<Observable<R>>((item) => {
      const cacheKey = options.key ? item[options.key] : item
      if (!cache.current.has(cacheKey)) {
        const observable = asObservable(item)
        if (!observable) return []

        cache.current.set(cacheKey, observable)
      }
      return cache.current.get(cacheKey) as Observable<R>
    })
  }, [options.skip, initial])

  useEffect(() => {
    if (!observables) return
    observables?.forEach((observable, index) => {
      observable.subscribe((item) => {
        // TODO remove the "as any" after updating TypeScript
        setResult((items = []) => (items as any).toSpliced(index, index < items.length ? 1 : 0, item))
      })
    })
  }, [observables])

  return result
}
