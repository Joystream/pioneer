import { useApi } from './useApi'
import { useObservable } from './useObservable'

export function useCurrentBlockNumber() {
  const { api, connectionState } = useApi()

  return useObservable(api?.rpc.chain.subscribeNewHeads(), [connectionState])?.number.toBn()
}
