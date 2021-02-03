import { useEffect, useState } from 'react'
import { Observable } from 'rxjs'

export function useObservable<T>(observable: Observable<T> | undefined, deps: readonly any[]) {
  const [data, setData] = useState<T | undefined>(undefined)

  useEffect(() => {
    const subscription = observable?.subscribe(setData)
    return () => subscription && subscription.unsubscribe()
  }, deps)

  return data
}
