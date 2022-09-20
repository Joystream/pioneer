import { useEffect, useMemo, useState } from 'react'
import { Observable } from 'rxjs'

export function useObservable<T>(observableFactory: () => Observable<T> | undefined, deps: readonly any[]) {
  const [data, setData] = useState<T | undefined>(undefined)

  const observable = useMemo(observableFactory, deps)

  useEffect(() => {
    const subscription = observable?.subscribe(setData)
    return () => subscription && subscription.unsubscribe()
  }, [observable])

  return useMemo(() => data, [JSON.stringify(data)])
}
