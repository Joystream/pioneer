import { useApi } from './useApi'
import { useObservable } from './useObservable'

export function useCurrentBlockNumber() {
  const { api } = useApi()

  return useObservable(api?.rpc.chain.subscribeNewHeads(), [api])?.number.toBn()
}
