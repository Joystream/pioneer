import { useCallback, useMemo } from 'react'

type Props = { state?: Record<string, string>; spy?: CallableFunction }
export type MockLocalStorage = { localStorage?: Props }

export const useMockLocalStorage = ({ state = {}, spy }: Props = {}) => {
  const spyOn = useCallback(
    <T extends (...args: any[]) => any>(key: string, fn: T) =>
      (...args: Parameters<T>): ReturnType<T> => {
        spy?.(key, ...args)
        return fn(...args)
      },
    [spy]
  )

  const storageMap = useMemo(() => new Map<string, string>(Object.entries(state)), [state])

  const storage: Storage = useMemo(
    () => ({
      get length() {
        return storageMap.size
      },
      key: spyOn('key', (index) => Array.from(storageMap.keys())[index]),
      clear: spyOn('clear', () => storageMap.clear()),
      getItem: spyOn('getItem', (key) => storageMap.get(key) ?? null),
      setItem: spyOn('setItem', (key, value) => storageMap.set(key, value)),
      removeItem: spyOn('removeItem', (key) => storageMap.delete(key)),
    }),
    [storageMap, spyOn]
  )

  Object.defineProperty(global, 'localStorage', { get: () => storage })
}
