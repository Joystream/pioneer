import { useMemo } from 'react'

import { DEFAULT_NETWORK, IS_TESTNET_DEFINED, NetworkEndpoints, NetworkType } from '@/app/config'
import { endpointsAreDefined } from '@/common/providers/network-endpoints/provider'

import { useLocalStorage } from './useLocalStorage'

export const useNetwork = () => {
  const [network = DEFAULT_NETWORK.type, setNetwork] = useLocalStorage<NetworkType>('network')

  const [autoConfEndpoints] = useLocalStorage<NetworkEndpoints>('auto_network_config')
  const networks = useMemo<NetworkType[]>(
    () => [
      'local',
      ...(IS_DEVELOPMENT ? ['local-mocks' as const] : []),
      ...(endpointsAreDefined(autoConfEndpoints) ? ['auto-conf' as const] : []),
      ...(IS_TESTNET_DEFINED ? ['olympia-testnet' as const] : []),
    ],
    [autoConfEndpoints]
  )

  return { network, setNetwork, networks }
}
