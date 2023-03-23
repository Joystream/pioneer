import { isFunction } from 'lodash'
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
  const [state, setState] = useState<T | undefined>(() => {
    return getItem(key)
  })

  useEffect(() => {
    setState(getItem(key))
  }, [key])

  useEffect(() => {
    const handleEventOnce = () => {
      setState(getItem(key))
    }

    document.addEventListener(`storage_event_${key}`, handleEventOnce)
    return () => {
      document.removeEventListener(`storage_event_${key}`, handleEventOnce)
    }
  }, [])

  const dispatch = useCallback(
    (setStateAction: T | ((prevState?: T) => T)) => {
      const value = isFunction(setStateAction) ? setStateAction(getItem(key)) : setStateAction
      setItem(key, value)
      document.dispatchEvent(new CustomEvent(`storage_event_${key}`, {}))
    },
    [key]
  )

  return [state, dispatch] as const
}
