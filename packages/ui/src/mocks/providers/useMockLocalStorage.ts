import { useMemo } from 'react'

export type MockLocalStorage = { localStorage?: Record<string, string> }

export const useMockLocalStorage = (state: Record<string, string> = {}) => {
  const storageMap = useMemo(() => new Map<string, string>(Object.entries(state)), [state])

  const storage: Storage = useMemo(
    () => ({
      get length() {
        return storageMap.size
      },
      key: (index) => Array.from(storageMap.keys())[index],
      clear: () => storageMap.clear(),
      getItem: (key) => storageMap.get(key) ?? null,
      setItem: (key, value) => storageMap.set(key, value),
      removeItem: (key) => storageMap.delete(key),
    }),
    [storageMap]
  )

  Object.defineProperty(global, 'localStorage', { get: () => storage })
}
