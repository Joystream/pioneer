import { NetworkType, configuredNetworks } from '@/app/config'

import { useLocalStorage } from './useLocalStorage'

export const useNetwork = () => {
  const [network, setNetwork] = useLocalStorage<NetworkType>('network')
  const networks: NetworkType[] = configuredNetworks()

  // Ensure we have endpoints configured for selected network
  if (networks.find((n) => n === network)) {
    return [network!, setNetwork] as const
  } else {
    // Either the network was not specified,
    // network was once available but is not recognized by pioneer anymore,
    // or network has no endpoints configured in the current build of pioneer.
    // Fallback to 'local'
    return ['local', setNetwork] as const
  }
}
