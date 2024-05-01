import { useNetworkEndpoints } from './useNetworkEndpoints'

export const usePolkadotAppLink = (
  polkadotApp = process.env.REACT_APP_POLKADOT_APP ?? 'https://polkadot.js.org/apps'
): string => {
  const [endpoints] = useNetworkEndpoints()
  return `${polkadotApp}?rpc=${endpoints.nodeRpcEndpoint}#`
}
