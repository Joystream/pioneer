import { isFunction } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

const getItem = (key?: string, storage = localStorage) => {
  if (key === undefined) {
    return
  }

  const item = storage.getItem(key)
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

const setItem = (key?: string, value?: any, storage = localStorage) => {
  if (key === undefined) {
    return
  }

  if (value === undefined) {
    storage.removeItem(key)
  } else {
    const toStore = JSON.stringify(value)
    storage.setItem(key, toStore)
    return JSON.parse(toStore)
  }
}

export const useLocalStorage = <T>(key?: string, storage = localStorage) => {
  const [state, setState] = useState<T | undefined>(() => {
    return getItem(key)
  })

  useEffect(() => {
    setState(getItem(key, storage))
  }, [key])

  const dispatch = useCallback(
    (setStateAction: T | ((prevState?: T) => T)) => {
      const value = isFunction(setStateAction) ? setStateAction(getItem(key)) : setStateAction
      setState(value)
      setItem(key, value, storage)
    },
    [key]
  )

  return [state, dispatch] as const
}
