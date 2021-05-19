import { useEffect, useState } from 'react'

interface ReturnType<T> {
  loading: boolean
  data: T | undefined
  error: any
}
export const useMockDelay = <T extends any>(toReturn: T): ReturnType<T> => {
  const [data, setData] = useState<T>()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(toReturn)
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [toReturn])

  return { loading: !data, data, error: undefined }
}
