import { useApi } from './useApi'
import { useObservable } from './useObservable'

export function useBlockHash(num?: number) {
  const { api, connectionState } = useApi()

  return useObservable(api?.rpc.chain.getBlockHash(num), [connectionState, num])?.toHex()
}
