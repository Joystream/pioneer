import { createContext } from 'react'

import {
  MEMBERSHIP_FAUCET_ENDPOINT,
  NODE_RPC_ENDPOINT,
  QUERY_NODE_ENDPOINT,
  QUERY_NODE_ENDPOINT_SUBSCRIPTION,
} from '@/app/config'

export interface NetworkEndpoints {
  queryNodeEndpointSubscription: string
  queryNodeEndpoint: string
  membershipFaucetEndpoint: string
  nodeRpcEndpoint: string
}

export const localEndpoints = {
  queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION.local,
  queryNodeEndpoint: QUERY_NODE_ENDPOINT.local,
  membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT.local,
  nodeRpcEndpoint: NODE_RPC_ENDPOINT.local,
} as NetworkEndpoints

export const olympiaEndpoints = {
  queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION['olympia-testnet'],
  queryNodeEndpoint: QUERY_NODE_ENDPOINT['olympia-testnet'],
  membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT['olympia-testnet'],
  nodeRpcEndpoint: NODE_RPC_ENDPOINT['olympia-testnet'],
} as NetworkEndpoints

type UseNetworkEndpoints = [NetworkEndpoints, (endpoint: string) => void]

export const NetworkEndpointsContext = createContext<UseNetworkEndpoints>([olympiaEndpoints, () => undefined])
