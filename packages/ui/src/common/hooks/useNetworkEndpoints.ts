import { useEffect, useState } from 'react'

import {
  MEMBERSHIP_FAUCET_ENDPOINT,
  NetworkType,
  NODE_RPC_ENDPOINT,
  OLYMPIA_TESTNET_CONFIG_ENDPOINT,
  QUERY_NODE_ENDPOINT,
  QUERY_NODE_ENDPOINT_SUBSCRIPTION,
} from '@/app/config'
import { isDefined } from '@/common/utils'

import { useLocalStorage } from './useLocalStorage'

export interface NetworkEndpoints {
  queryNodeEndpointSubscription: string
  queryNodeEndpoint: string
  membershipFaucetEndpoint: string
  nodeRpcEndpoint: string
}

export const useNetworkEndpoints = (network: NetworkType): [Partial<NetworkEndpoints>, (value: string) => void] => {
  const [endpoints, setEndpoints] = useState<Partial<NetworkEndpoints>>()
  const [configEndpoint, setConfigEndpoint] = useLocalStorage<string>('NETWORK_CONFIG_ENDPOINT')

  useEffect(() => {
    setEndpoints({
      queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION[network],
      queryNodeEndpoint: QUERY_NODE_ENDPOINT[network],
      membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT[network],
      nodeRpcEndpoint: NODE_RPC_ENDPOINT[network],
    })
  }, [network])

  useEffect(() => {
    if (!configEndpoint) {
      OLYMPIA_TESTNET_CONFIG_ENDPOINT && setConfigEndpoint(OLYMPIA_TESTNET_CONFIG_ENDPOINT)
      return
    }

    if (network !== 'olympia-testnet' || !endpoints || Object.values(endpoints).every(isDefined)) {
      return
    }

    fetch(configEndpoint).then(async (res) => {
      const config = await res.json()

      setEndpoints({
        queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION[network] ?? config['graphql_server_websocket'],
        queryNodeEndpoint: QUERY_NODE_ENDPOINT[network] ?? config['graphql_server'],
        membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT[network] ?? config['member_faucet'],
        nodeRpcEndpoint: NODE_RPC_ENDPOINT[network] ?? config['websocket_rpc'],
      })
    })
  }, [configEndpoint, network, Object.values(endpoints ?? {}).join('|')])

  return [endpoints ?? {}, setConfigEndpoint]
}
