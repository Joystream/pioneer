export type NetworkType = 'mainnet' | 'local' | 'testnet' | 'auto-conf' | 'local-mocks'

export interface NetworkEndpoints {
  nodeRpcEndpoint: string
  queryNodeEndpoint: string
  queryNodeEndpointSubscription: string
  membershipFaucetEndpoint: string
  configEndpoint?: string
}

const TESTNET_NODE_SOCKET = process.env.REACT_APP_TESTNET_NODE_SOCKET
const TESTNET_QUERY_NODE = process.env.REACT_APP_TESTNET_QUERY_NODE
const TESTNET_QUERY_NODE_SOCKET = process.env.REACT_APP_TESTNET_QUERY_NODE_SOCKET
const TESTNET_MEMBERSHIP_FAUCET_URL = process.env.REACT_APP_TESTNET_MEMBERSHIP_FAUCET_URL

export const IS_TESTNET_DEFINED =
  TESTNET_NODE_SOCKET && TESTNET_QUERY_NODE && TESTNET_QUERY_NODE_SOCKET && TESTNET_MEMBERSHIP_FAUCET_URL

const MAINNET_NODE_SOCKET = process.env.REACT_APP_MAINNET_NODE_SOCKET
const MAINNET_QUERY_NODE = process.env.REACT_APP_MAINNET_QUERY_NODE
const MAINNET_QUERY_NODE_SOCKET = process.env.REACT_APP_MAINNET_QUERY_NODE_SOCKET
const MAINNET_MEMBERSHIP_FAUCET_URL = process.env.REACT_APP_MAINNET_MEMBERSHIP_FAUCET_URL

export const IS_MAINNET_DEFINED =
  MAINNET_NODE_SOCKET && MAINNET_QUERY_NODE && MAINNET_QUERY_NODE_SOCKET && MAINNET_MEMBERSHIP_FAUCET_URL

type PredefinedEndpoint = { [K in NetworkType]?: string }

const QUERY_NODE_ENDPOINT_SUBSCRIPTION: PredefinedEndpoint = {
  mainnet: MAINNET_QUERY_NODE_SOCKET,
  local: 'ws://localhost:8081/graphql',
  testnet: TESTNET_QUERY_NODE_SOCKET,
  'local-mocks': 'ws://localhost:8081/graphql',
}

const QUERY_NODE_ENDPOINT: PredefinedEndpoint = {
  mainnet: MAINNET_QUERY_NODE,
  local: 'http://localhost:8081/graphql',
  testnet: TESTNET_QUERY_NODE,
  'local-mocks': 'http://localhost:8081/graphql',
}

const MEMBERSHIP_FAUCET_ENDPOINT: PredefinedEndpoint = {
  mainnet: MAINNET_MEMBERSHIP_FAUCET_URL,
  local: 'http://localhost:3002/register',
  testnet: TESTNET_MEMBERSHIP_FAUCET_URL,
  'local-mocks': 'http://localhost:3002/register',
}

const NODE_RPC_ENDPOINT: PredefinedEndpoint = {
  mainnet: MAINNET_NODE_SOCKET,
  local: 'ws://127.0.0.1:9944',
  testnet: TESTNET_NODE_SOCKET,
  'local-mocks': 'ws://127.0.0.1:9944',
}

export const pickEndpoints = (network: NetworkType): Partial<NetworkEndpoints> => ({
  nodeRpcEndpoint: NODE_RPC_ENDPOINT[network],
  queryNodeEndpoint: QUERY_NODE_ENDPOINT[network],
  queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION[network],
  membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT[network],
  configEndpoint: undefined,
})

export const DEFAULT_NETWORK = (
  IS_MAINNET_DEFINED
    ? {
        type: 'mainnet',
        endpoints: pickEndpoints('mainnet'),
      }
    : IS_TESTNET_DEFINED
    ? { type: 'testnet', endpoints: pickEndpoints('testnet') }
    : { type: 'local', endpoints: pickEndpoints('local') }
) as {
  type: NetworkType
  endpoints: NetworkEndpoints
}
