import { useCallback, useEffect, useState } from 'react'

const getItem = (key?: string) => {
  if (key === undefined) {
    return
  }

  const item = window.localStorage.getItem(key)
  let result
  if (item !== null) {
    try {
      result = JSON.parse(item)
    } catch (e) {
      // ignore error
    }
  }
  return result
}

const setItem = (key?: string, value?: any) => {
  if (key === undefined) {
    return
  }

  if (value === undefined) {
    window.localStorage.removeItem(key)
  } else {
    const toStore = JSON.stringify(value)
    window.localStorage.setItem(key, toStore)
    return JSON.parse(toStore)
  }
}

export const useLocalStorage = <T>(key?: string) => {
  const [value, setValue] = useState<T | undefined>(() => {
    return getItem(key)
  })

  useEffect(() => {
    setValue(getItem(key))
  }, [key])

  const set = useCallback(
    (value: T) => {
      setValue(value)
      setItem(key, value)
    },
    [key]
  )

  return [value, set] as const
}
