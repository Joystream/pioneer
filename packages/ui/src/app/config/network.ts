export type NetworkType = 'local' | 'local-mocks' | 'olympia-testnet' | 'auto-conf'

const OLYMPIA_TESTNET_NODE_SOCKET = process.env.REACT_APP_OLYMPIA_TESTNET_NODE_SOCKET
const OLYMPIA_TESTNET_QUERY_NODE = process.env.REACT_APP_OLYMPIA_TESTNET_QUERY_NODE
const OLYMPIA_TESTNET_QUERY_NODE_SOCKET = process.env.REACT_APP_OLYMPIA_TESTNET_QUERY_NODE_SOCKET
const OLYMPIA_TESTNET_MEMBERSHIP_FAUCET_URL = process.env.REACT_APP_OLYMPIA_TESTNET_MEMBERSHIP_FAUCET_URL

export const configuredNetworks = () => {
  const networks: NetworkType[] = ['local', 'local-mocks', 'auto-conf']

  // Only include olympia-testnet if all env variables were defined
  if (
    OLYMPIA_TESTNET_NODE_SOCKET &&
    OLYMPIA_TESTNET_QUERY_NODE &&
    OLYMPIA_TESTNET_QUERY_NODE_SOCKET &&
    OLYMPIA_TESTNET_MEMBERSHIP_FAUCET_URL
  ) {
    networks.push('olympia-testnet')
  }
  return networks
}

export const QUERY_NODE_ENDPOINT_SUBSCRIPTION: Record<NetworkType, string | undefined> = {
  local: 'ws://localhost:8081/graphql',
  'local-mocks': 'ws://localhost:8081/graphql',
  'olympia-testnet': OLYMPIA_TESTNET_QUERY_NODE_SOCKET,
  'auto-conf': 'ws://localhost:8081/graphql',
}

export const QUERY_NODE_ENDPOINT: Record<NetworkType, string | undefined> = {
  local: 'http://localhost:8081/graphql',
  'local-mocks': 'http://localhost:8081/graphql',
  'olympia-testnet': OLYMPIA_TESTNET_QUERY_NODE,
  'auto-conf': 'http://localhost:8081/graphql',
}

export const MEMBERSHIP_FAUCET_ENDPOINT: Record<NetworkType, string | undefined> = {
  local: 'http://localhost:3002/register',
  'local-mocks': 'http://localhost:3002/register',
  'olympia-testnet': OLYMPIA_TESTNET_MEMBERSHIP_FAUCET_URL,
  'auto-conf': 'http://localhost:3002/register',
}

export const NODE_RPC_ENDPOINT: Record<NetworkType, string | undefined> = {
  local: 'ws://127.0.0.1:9944',
  'local-mocks': 'ws://127.0.0.1:9944',
  'olympia-testnet': OLYMPIA_TESTNET_NODE_SOCKET,
  'auto-conf': 'ws://127.0.0.1:9944',
}
