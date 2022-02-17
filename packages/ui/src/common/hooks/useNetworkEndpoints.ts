import { useContext } from 'react'

import { NetworkEndpointsContext } from '../providers/network-endpoints/context'

export const useNetworkEndpoints = () => useContext(NetworkEndpointsContext)
