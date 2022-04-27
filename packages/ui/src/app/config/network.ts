export type NetworkType = 'local' | 'local-mocks' | 'olympia-testnet' | 'auto-conf'

export interface NetworkEndpoints {
  queryNodeEndpointSubscription: string
  queryNodeEndpoint: string
  membershipFaucetEndpoint: string
  nodeRpcEndpoint: string
}

const OLYMPIA_TESTNET_NODE_SOCKET = process.env.REACT_APP_OLYMPIA_TESTNET_NODE_SOCKET
const OLYMPIA_TESTNET_QUERY_NODE = process.env.REACT_APP_OLYMPIA_TESTNET_QUERY_NODE
const OLYMPIA_TESTNET_QUERY_NODE_SOCKET = process.env.REACT_APP_OLYMPIA_TESTNET_QUERY_NODE_SOCKET
const OLYMPIA_TESTNET_MEMBERSHIP_FAUCET_URL = process.env.REACT_APP_OLYMPIA_TESTNET_MEMBERSHIP_FAUCET_URL
const ENVIRONMENT = process.env.ENVIRONMENT

export const IS_TESTNET_DEFINED =
  OLYMPIA_TESTNET_NODE_SOCKET &&
  OLYMPIA_TESTNET_QUERY_NODE &&
  OLYMPIA_TESTNET_QUERY_NODE_SOCKET &&
  OLYMPIA_TESTNET_MEMBERSHIP_FAUCET_URL

export const IS_IN_DEV_ENVIRONMENT = ENVIRONMENT === 'DEV'

type PredefinedEndpoint = { [K in NetworkType]?: string }

const QUERY_NODE_ENDPOINT_SUBSCRIPTION: PredefinedEndpoint = {
  local: 'ws://localhost:8081/graphql',
  'local-mocks': 'ws://localhost:8081/graphql',
  'olympia-testnet': OLYMPIA_TESTNET_QUERY_NODE_SOCKET,
}

const QUERY_NODE_ENDPOINT: PredefinedEndpoint = {
  local: 'http://localhost:8081/graphql',
  'local-mocks': 'http://localhost:8081/graphql',
  'olympia-testnet': OLYMPIA_TESTNET_QUERY_NODE,
}

const MEMBERSHIP_FAUCET_ENDPOINT: PredefinedEndpoint = {
  local: 'http://localhost:3002/register',
  'local-mocks': 'http://localhost:3002/register',
  'olympia-testnet': OLYMPIA_TESTNET_MEMBERSHIP_FAUCET_URL,
}

const NODE_RPC_ENDPOINT: PredefinedEndpoint = {
  local: 'ws://127.0.0.1:9944',
  'local-mocks': 'ws://127.0.0.1:9944',
  'olympia-testnet': OLYMPIA_TESTNET_NODE_SOCKET,
}

export const pickEndpoints = (network: NetworkType): Partial<NetworkEndpoints> => ({
  queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION[network],
  queryNodeEndpoint: QUERY_NODE_ENDPOINT[network],
  membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT[network],
  nodeRpcEndpoint: NODE_RPC_ENDPOINT[network],
})

export const DEFAULT_NETWORK = (IS_TESTNET_DEFINED
  ? { type: 'olympia-testnet', endpoints: pickEndpoints('olympia-testnet') }
  : { type: 'local', endpoints: pickEndpoints('local') }) as {
  type: NetworkType
  endpoints: NetworkEndpoints
}
