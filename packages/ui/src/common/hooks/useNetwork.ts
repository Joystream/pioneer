import { NetworkType } from '@/app/config'

import { useLocalStorage } from './useLocalStorage'

export const useNetwork = () => {
  const [network, setNetwork] = useLocalStorage<NetworkType>('network')
  const resolvedNetwork = network ?? 'olympia-testnet'

  return [resolvedNetwork, setNetwork] as const
}
