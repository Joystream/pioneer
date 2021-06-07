import { DependencyList, useEffect, useState } from 'react'

interface ReturnType<T> {
  loading: boolean
  data: T | undefined
  error: any
}
export const useMockDelay = <T extends any>(
  toReturn: T,
  deps: DependencyList | undefined = [JSON.stringify(toReturn)]
): ReturnType<T> => {
  const [data, setData] = useState<T>()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(toReturn)
    }, 500)
    return () => {
      setData(undefined)
      clearTimeout(timeout)
    }
  }, deps)

  return { loading: !data, data, error: undefined }
}
