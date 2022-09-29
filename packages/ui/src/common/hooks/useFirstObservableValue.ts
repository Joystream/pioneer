import { useEffect, useMemo, useState } from 'react'
import { firstValueFrom, Observable } from 'rxjs'

export function useFirstObservableValue<T>(observableFactory: () => Observable<T> | undefined, deps: readonly any[]) {
  const [data, setData] = useState<T | undefined>(undefined)

  const observable = useMemo(observableFactory, deps)

  useEffect(() => {
    if (observable) {
      firstValueFrom(observable).then((value) => setData(value))
    }
  }, [observable])

  return data
}
