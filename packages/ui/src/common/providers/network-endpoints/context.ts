import { createContext } from 'react'

import { DEFAULT_NETWORK, NetworkEndpoints } from '@/app/config'

type UseNetworkEndpoints = [NetworkEndpoints, (endpoint: string) => void]

export const NetworkEndpointsContext = createContext<UseNetworkEndpoints>([DEFAULT_NETWORK.endpoints, () => undefined])
