import { useEffect, useState } from 'react'

function getItem(key: string) {
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

function setItem(key: string, value: any) {
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
    if (key) return getItem(key)
  })

  useEffect(() => {
    if (key) setValue(getItem(key))
  }, [key])

  useEffect(() => {
    if (key) setItem(key, value)
  }, [value])

  return [value, setValue] as const
}
