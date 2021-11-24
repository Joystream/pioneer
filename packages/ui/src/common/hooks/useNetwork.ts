import { useLocalStorage } from './useLocalStorage'

export type NetworkType = 'local' | 'local-mocks' | 'olympia-testnet'

export const useNetwork = () => {
  const [network, setNetwork] = useLocalStorage<NetworkType>('network')
  const resolvedNetwork = network || 'local'

  return [resolvedNetwork, setNetwork] as const
}
