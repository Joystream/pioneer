export type NetworkType = 'local' | 'local-mocks' | 'joystream-testnet' | 'auto-conf'

export interface NetworkEndpoints {
  nodeRpcEndpoint: string
  queryNodeEndpoint: string
  queryNodeEndpointSubscription?: string
  membershipFaucetEndpoint?: string
}

const TESTNET_NODE_SOCKET = process.env.REACT_APP_TESTNET_NODE_SOCKET
const TESTNET_QUERY_NODE = process.env.REACT_APP_TESTNET_QUERY_NODE
const TESTNET_QUERY_NODE_SOCKET = process.env.REACT_APP_TESTNET_QUERY_NODE_SOCKET
const TESTNET_MEMBERSHIP_FAUCET_URL = process.env.REACT_APP_TESTNET_MEMBERSHIP_FAUCET_URL

export const IS_TESTNET_DEFINED =
  TESTNET_NODE_SOCKET && TESTNET_QUERY_NODE && TESTNET_QUERY_NODE_SOCKET && TESTNET_MEMBERSHIP_FAUCET_URL

type PredefinedEndpoint = { [K in NetworkType]?: string }

const QUERY_NODE_ENDPOINT_SUBSCRIPTION: PredefinedEndpoint = {
  local: 'ws://localhost:8081/graphql',
  'local-mocks': 'ws://localhost:8081/graphql',
  'joystream-testnet': TESTNET_QUERY_NODE_SOCKET,
}

const QUERY_NODE_ENDPOINT: PredefinedEndpoint = {
  local: 'http://localhost:8081/graphql',
  'local-mocks': 'http://localhost:8081/graphql',
  'joystream-testnet': TESTNET_QUERY_NODE,
}

const MEMBERSHIP_FAUCET_ENDPOINT: PredefinedEndpoint = {
  local: 'http://localhost:3002/register',
  'local-mocks': 'http://localhost:3002/register',
  'joystream-testnet': TESTNET_MEMBERSHIP_FAUCET_URL,
}

const NODE_RPC_ENDPOINT: PredefinedEndpoint = {
  local: 'ws://127.0.0.1:9944',
  'local-mocks': 'ws://127.0.0.1:9944',
  'joystream-testnet': TESTNET_NODE_SOCKET,
}

export const pickEndpoints = (network: NetworkType): Partial<NetworkEndpoints> => ({
  nodeRpcEndpoint: NODE_RPC_ENDPOINT[network],
  queryNodeEndpoint: QUERY_NODE_ENDPOINT[network],
  queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION[network],
  membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT[network],
})

export const DEFAULT_NETWORK = (
  IS_TESTNET_DEFINED
    ? { type: 'joystream-testnet', endpoints: pickEndpoints('joystream-testnet') }
    : { type: 'local', endpoints: pickEndpoints('local') }
) as {
  type: NetworkType
  endpoints: NetworkEndpoints
}
