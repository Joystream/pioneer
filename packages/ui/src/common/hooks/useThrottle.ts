import { useEffect, useRef, useState } from 'react'

export const useThrottle = <F extends (...args: any[]) => any>(callback: F, duration: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const [params, setParams] = useState<Parameters<F>>()
  const latestParams = useRef<Parameters<F>>()

  const clearLocalTimeout = () => {
    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = undefined
    }
  }

  useEffect(() => {
    if (params && !timeout.current) {
      callback(...params)
      timeout.current = setTimeout(() => {
        if (latestParams.current) {
          callback(...latestParams.current)
          latestParams.current = undefined
        }
        clearLocalTimeout()
      }, duration)
    } else {
      latestParams.current = params
    }
  }, [params])

  useEffect(() => clearLocalTimeout, [])

  return (...args: Parameters<F>) => setParams(args)
}
