import React, { ReactNode, Reducer, useCallback, useEffect, useReducer, useState } from 'react'
import * as Yup from 'yup'

import { DEFAULT_NETWORK, NetworkEndpoints, pickEndpoints } from '@/app/config'
import { Loading } from '@/common/components/Loading'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useNetwork } from '@/common/hooks/useNetwork'
import { objectEquals } from '@/common/utils'

import { NetworkEndpointsContext } from './context'

interface Props {
  children: ReactNode
}

const EndpointsSchema = Yup.object().shape({
  nodeRpcEndpoint: Yup.string().required(),
  queryNodeEndpoint: Yup.string().required(),
  queryNodeEndpointSubscription: Yup.string(),
  membershipFaucetEndpoint: Yup.string(),
  backendEndpoint: Yup.string(),
})

// HACK Pioneer should store the actual HTTP-RPC endpoint.
const endpointReducer: Reducer<NetworkEndpoints | undefined, Omit<NetworkEndpoints, 'nodeHttpRpcEndpoint'>> = (
  _,
  newEndpoints
): NetworkEndpoints => ({
  ...newEndpoints,
  nodeHttpRpcEndpoint: newEndpoints.nodeRpcEndpoint
    .replace('ws:', 'http:')
    .replace('wss:', 'https:')
    .replace('ws-rpc', 'http-rpc')
    .replace(':9944', ''),
})

export const NetworkEndpointsProvider = ({ children }: Props) => {
  const { network, setNetwork } = useNetwork()
  const [endpoints, setEndpoints] = useReducer(endpointReducer, undefined)
  const [autoConfEndpoints, storeAutoConfEndpoints] = useLocalStorage<NetworkEndpoints>('auto_network_config')
  const [isLoading, setIsLoading] = useState(false)
  const [customEndpoints] = useLocalStorage<NetworkEndpoints>('custom_endpoint')

  const updateNetworkConfig = useCallback(
    async (configEndpoint: string) => {
      setIsLoading(true)
      let config
      try {
        config = await (await fetch(configEndpoint)).json()
      } catch (err) {
        setIsLoading(false)
        const errMsg = `Failed to fetch the network configuration from ${configEndpoint}.\n${String(err)}`
        throw new Error(`${errMsg}`)
      }

      const newAutoConfEndpoints = {
        queryNodeEndpointSubscription: config['graphql_server_websocket'],
        queryNodeEndpoint: config['graphql_server'],
        membershipFaucetEndpoint: config['member_faucet'],
        nodeRpcEndpoint: config['websocket_rpc'],
        configEndpoint: config['config'],
      }

      if (!endpointsAreDefined(newAutoConfEndpoints)) {
        setIsLoading(false)
        throw new Error('fetched config missing endpoints')
      }

      const shouldUpdateConfig = !objectEquals<Partial<NetworkEndpoints>>(newAutoConfEndpoints)(autoConfEndpoints ?? {})
      const shouldUpdateNetwork = network !== 'auto-conf'

      if (shouldUpdateConfig) {
        storeAutoConfEndpoints(newAutoConfEndpoints)
      }
      if (shouldUpdateNetwork) {
        setNetwork('auto-conf')
      }
      if (shouldUpdateConfig || shouldUpdateNetwork) {
        return window.location.reload()
      }
      setIsLoading(false)
    },
    [network]
  )

  useEffect(() => {
    const endpoints = pickEndpoints(network)

    if (endpointsAreDefined(endpoints)) {
      setEndpoints(endpoints)
    } else if (network === 'auto-conf' && endpointsAreDefined(autoConfEndpoints)) {
      setEndpoints(autoConfEndpoints)
    } else if (network === 'custom') {
      if (endpointsAreDefined(customEndpoints)) {
        setEndpoints(customEndpoints)
      } else {
        setEndpoints(DEFAULT_NETWORK.endpoints)
      }
    } else {
      setNetwork(DEFAULT_NETWORK.type)
      setEndpoints(DEFAULT_NETWORK.endpoints)
    }
  }, [network, customEndpoints])

  if (!endpointsAreDefined(endpoints) || isLoading) {
    return <Loading text="Loading network endpoints" />
  }

  return (
    <NetworkEndpointsContext.Provider value={[endpoints, updateNetworkConfig]}>
      {children}
    </NetworkEndpointsContext.Provider>
  )
}

export const endpointsAreDefined = (endpoints: Partial<NetworkEndpoints> = {}): endpoints is NetworkEndpoints =>
  EndpointsSchema.isValidSync(endpoints)
