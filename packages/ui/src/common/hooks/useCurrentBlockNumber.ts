import { useApi } from '@/api/hooks/useApi'

import { useObservable } from './useObservable'

export function useCurrentBlockNumber() {
  const { api } = useApi()

  return useObservable(() => api?.rpc.chain.subscribeNewHeads(), [api?.isConnected])?.number.toBn()
}
