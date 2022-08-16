import { useApi } from '../../api/hooks/useApi'

import { useObservable } from './useObservable'

export function useBlockHash(num?: string) {
  const { api, connectionState } = useApi()

  return useObservable(api?.rpc.chain.getBlockHash(num), [connectionState, num])?.toHex()
}
