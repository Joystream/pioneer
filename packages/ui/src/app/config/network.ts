export type NetworkType = 'local' | 'local-mocks' | 'olympia-testnet'

export const OLYMPIA_TESTNET_CONFIG_ENDPOINT =
  process.env.REACT_APP_OLYMPIA_TESTNET_CONFIG_ENDPOINT ?? 'https://54.210.109.171.nip.io/config.json'

const OLYMPIA_TESTNET_NODE_SOCKET = process.env.REACT_APP_OLYMPIA_TESTNET_NODE_SOCKET
const OLYMPIA_TESTNET_QUERY_NODE = process.env.REACT_APP_OLYMPIA_TESTNET_QUERY_NODE
const OLYMPIA_TESTNET_QUERY_NODE_SOCKET = process.env.REACT_APP_OLYMPIA_TESTNET_QUERY_NODE_SOCKET
const MEMBERSHIP_FAUCET_URL = process.env.REACT_APP_MEMBERSHIP_FAUCET_URL

export const QUERY_NODE_ENDPOINT_SUBSCRIPTION: Record<NetworkType, string | undefined> = {
  local: 'ws://localhost:8081/graphql',
  'local-mocks': 'ws://localhost:8081/graphql',
  'olympia-testnet': OLYMPIA_TESTNET_QUERY_NODE_SOCKET,
}

export const QUERY_NODE_ENDPOINT: Record<NetworkType, string | undefined> = {
  local: 'http://localhost:8081/graphql',
  'local-mocks': 'http://localhost:8081/graphql',
  'olympia-testnet': OLYMPIA_TESTNET_QUERY_NODE,
}

export const MEMBERSHIP_FAUCET_ENDPOINT: Record<NetworkType, string | undefined> = {
  local: 'http://localhost:3002/register',
  'local-mocks': 'http://localhost:3002/register',
  'olympia-testnet': MEMBERSHIP_FAUCET_URL,
}

export const NODE_RPC_ENDPOINT: Record<NetworkType, string | undefined> = {
  local: 'ws://127.0.0.1:9944',
  'local-mocks': 'ws://127.0.0.1:9944',
  'olympia-testnet': OLYMPIA_TESTNET_NODE_SOCKET,
}
