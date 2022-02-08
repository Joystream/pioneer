export type NetworkType = 'local' | 'local-mocks' | 'olympia-testnet'

const OLYMPIA_TESTNET_NODE_SOCKET =
  process.env.REACT_APP_OLYMPIA_TESTNET_NODE_SOCKET || 'wss://54.210.109.171.nip.io/ws-rpc'
const OLYMPIA_TESTNET_QUERY_NODE =
  process.env.REACT_APP_OLYMPIA_TESTNET_QUERY_NODE || 'https://54.210.109.171.nip.io/query-node/server/graphql'
const OLYMPIA_TESTNET_QUERY_NODE_SOCKET =
  process.env.REACT_APP_OLYMPIA_TESTNET_QUERY_NODE_SOCKET || 'wss://54.210.109.171.nip.io/query-node/server/graphql'
const MEMBERSHIP_FAUCET_URL =
  process.env.REACT_APP_MEMBERSHIP_FAUCET_URL || 'https://54.210.109.171.nip.io/member-faucet/register'

export const QUERY_NODE_ENDPOINT_SUBSCRIPTION: Record<NetworkType, string> = {
  local: 'ws://localhost:8081/graphql',
  'local-mocks': 'ws://localhost:8081/graphql',
  'olympia-testnet': OLYMPIA_TESTNET_QUERY_NODE_SOCKET,
}

export const QUERY_NODE_ENDPOINT: Record<NetworkType, string> = {
  local: 'http://localhost:8081/graphql',
  'local-mocks': 'http://localhost:8081/graphql',
  'olympia-testnet': OLYMPIA_TESTNET_QUERY_NODE,
}

export const MEMBERSHIP_FAUCET_ENDPOINT: Record<NetworkType, string> = {
  local: 'http://localhost:4004/register',
  'local-mocks': 'http://localhost:4004/register',
  'olympia-testnet': MEMBERSHIP_FAUCET_URL,
}

export const NODE_RPC_ENDPOINT: Record<NetworkType, string> = {
  local: 'ws://127.0.0.1:9944',
  'local-mocks': 'ws://127.0.0.1:9944',
  'olympia-testnet': OLYMPIA_TESTNET_NODE_SOCKET,
}
