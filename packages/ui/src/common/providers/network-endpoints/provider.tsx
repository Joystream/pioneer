import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import {
  MEMBERSHIP_FAUCET_ENDPOINT,
  NetworkType,
  NODE_RPC_ENDPOINT,
  QUERY_NODE_ENDPOINT,
  QUERY_NODE_ENDPOINT_SUBSCRIPTION,
} from '@/app/config'
import { Loading } from '@/common/components/Loading'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useNetwork } from '@/common/hooks/useNetwork'
import { isDefined, objectEquals } from '@/common/utils'

import { localEndpoints, NetworkEndpoints, NetworkEndpointsContext } from './context'

interface Props {
  children: ReactNode
}

export const NetworkEndpointsProvider = ({ children }: Props) => {
  const [network, setNetwork] = useNetwork()
  const [endpoints, setEndpoints] = useState<Partial<NetworkEndpoints>>({})
  const [storedAutoNetworkConfig, storeAutoNetworkConfig] =
    useLocalStorage<Partial<NetworkEndpoints>>('auto_network_config')
  const [isLoading, setIsLoading] = useState(false)

  const updateNetworkConfig = useCallback(
    async (configEndpoint: string) => {
      setIsLoading(true)
      try {
        const config = await (await fetch(configEndpoint)).json()

        const newNetworkConfig = {
          queryNodeEndpointSubscription: config['graphql_server_websocket'],
          queryNodeEndpoint: config['graphql_server'],
          membershipFaucetEndpoint: config['member_faucet'],
          nodeRpcEndpoint: config['websocket_rpc'],
        }

        if (!endpointsAreDefined(newNetworkConfig)) {
          throw new Error('fetched config missing endpoints')
        }

        const shouldUpdateConfig = !objectEquals<Partial<NetworkEndpoints>>(newNetworkConfig)(
          storedAutoNetworkConfig ?? {}
        )
        const shouldUpdateNetwork = network !== 'auto-conf'

        if (shouldUpdateConfig) {
          storeAutoNetworkConfig(newNetworkConfig)
        }
        if (shouldUpdateNetwork) {
          setNetwork('auto-conf')
        }
        if (shouldUpdateConfig || shouldUpdateNetwork) {
          return window.location.reload()
        }
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        const errMsg = `Failed to fetch the network configuration from ${configEndpoint}.`

        setEndpoints(localEndpoints)
        throw new Error(`${errMsg} - Falling back on the local endpoints.`)
      }
    },
    [network]
  )

  useEffect(() => {
    const endpoints = pickEndpoints(network, storedAutoNetworkConfig ?? {})
    if (!endpointsAreDefined(endpoints) && network == 'auto-conf') {
      setNetwork('local')
      setEndpoints(localEndpoints)
    } else {
      setEndpoints(endpoints)
    }
  }, [network, updateNetworkConfig])

  if (!endpointsAreDefined(endpoints) || isLoading) {
    return <Loading text="Loading network endpoints" />
  }

  return (
    <NetworkEndpointsContext.Provider value={[pickEndpoints(network, endpoints), updateNetworkConfig]}>
      {children}
    </NetworkEndpointsContext.Provider>
  )
}

const endpointsAreDefined = (endpoints: Partial<NetworkEndpoints>): endpoints is NetworkEndpoints =>
  Object.values(endpoints).length === 4 && Object.values(endpoints).every(isDefined)

const pickEndpoints = <R extends Partial<NetworkEndpoints>>(network: NetworkType, endpoints: R) => {
  if (network === 'auto-conf') {
    // Use the stored config in localstorage, fallback on 'local'
    // If config endpoints are partially configured this will produce mixed results, punn intended.
    return {
      queryNodeEndpointSubscription: endpoints.queryNodeEndpointSubscription,
      queryNodeEndpoint: endpoints.queryNodeEndpoint,
      membershipFaucetEndpoint: endpoints.membershipFaucetEndpoint,
      nodeRpcEndpoint: endpoints.nodeRpcEndpoint,
    } as R
  } else {
    return {
      queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION[network],
      queryNodeEndpoint: QUERY_NODE_ENDPOINT[network],
      membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT[network],
      nodeRpcEndpoint: NODE_RPC_ENDPOINT[network],
    } as R
  }
}
