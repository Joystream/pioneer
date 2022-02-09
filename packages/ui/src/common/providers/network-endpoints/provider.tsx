import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import {
  MEMBERSHIP_FAUCET_ENDPOINT,
  NODE_RPC_ENDPOINT,
  OLYMPIA_TESTNET_CONFIG_ENDPOINT,
  QUERY_NODE_ENDPOINT,
  QUERY_NODE_ENDPOINT_SUBSCRIPTION,
} from '@/app/config'
import { Loading } from '@/common/components/Loading'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useNetwork } from '@/common/hooks/useNetwork'
import { isDefined } from '@/common/utils'

import { localEndpoints, NetworkEndpoints, NetworkEndpointsContext } from './context'

interface Props {
  children: ReactNode
}

export const NetworkEndpointsProvider = ({ children }: Props) => {
  const [network, setNetwork] = useNetwork()
  const [endpoints, setEndpoints] = useState<Partial<NetworkEndpoints>>({})
  const [storedConfigEndpoint, storeConfigEndpoint] = useLocalStorage<string>('NETWORK_CONFIG_ENDPOINT')

  const defaultConfigEndpoint = useMemo(() => storedConfigEndpoint ?? OLYMPIA_TESTNET_CONFIG_ENDPOINT, [
    storedConfigEndpoint,
  ])
  const defaultEndpoints = useMemo(
    () => ({
      queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION[network],
      queryNodeEndpoint: QUERY_NODE_ENDPOINT[network],
      membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT[network],
      nodeRpcEndpoint: NODE_RPC_ENDPOINT[network],
    }),
    [network]
  )

  const updateConfigEndpoint = useCallback(
    async (configEndpoint: string) => {
      try {
        const config = await (await fetch(configEndpoint)).json()

        setEndpoints({
          queryNodeEndpointSubscription:
            defaultEndpoints.queryNodeEndpointSubscription ?? config['graphql_server_websocket'],
          queryNodeEndpoint: defaultEndpoints.queryNodeEndpoint ?? config['graphql_server'],
          membershipFaucetEndpoint: defaultEndpoints.membershipFaucetEndpoint ?? config['member_faucet'],
          nodeRpcEndpoint: defaultEndpoints.nodeRpcEndpoint ?? config['websocket_rpc'],
        })

        if (configEndpoint !== storedConfigEndpoint) {
          storeConfigEndpoint(configEndpoint)
        }
        if (network !== 'olympia-testnet') {
          setNetwork('olympia-testnet')
        }
      } catch (err) {
        const errMsg = `Failed to fetch the network configuration from ${configEndpoint}.`

        if (
          (Object.values(endpoints).length > 0 && Object.values(endpoints).every(isDefined)) ||
          network !== 'olympia-testnet'
        ) {
          throw new Error(errMsg)
        } else {
          setEndpoints(localEndpoints)
          throw new Error(`${errMsg} Falling back on the local endpoints.`)
        }
      }
    },
    [defaultEndpoints, endpoints, network]
  )

  useEffect(() => setEndpoints(defaultEndpoints), [defaultEndpoints])

  useEffect(() => {
    if (defaultConfigEndpoint && network === 'olympia-testnet' && !Object.values(defaultEndpoints).every(isDefined)) {
      updateConfigEndpoint(defaultConfigEndpoint)
    }
  }, [defaultConfigEndpoint, network, defaultEndpoints])

  if (!endpointsAreDefined(endpoints)) {
    return <Loading text="Loading network endpoints" />
  }

  return (
    <NetworkEndpointsContext.Provider value={[endpoints, updateConfigEndpoint]}>
      {children}
    </NetworkEndpointsContext.Provider>
  )
}

const endpointsAreDefined = (endpoints: Partial<NetworkEndpoints>): endpoints is NetworkEndpoints =>
  Object.values(endpoints).length === 4 && Object.values(endpoints).every(isDefined)
