import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { useEffect, useState } from 'react'

interface UseApi {
  isConnected: boolean
  api: ApiPromise | undefined
}

export function useApi(): UseApi {
  const [isConnected, setIsConnected] = useState(false)
  const [api, setApi] = useState<ApiPromise | undefined>(undefined)

  useEffect(() => {
    const provider = new WsProvider('ws://127.0.0.1:9944/')
    const apiPromise = new ApiPromise({ provider, rpc: jsonrpc })

    apiPromise.on('connected', () => {
      apiPromise.isReady.then(() => setIsConnected(true))
      setApi(apiPromise)
    })
    apiPromise.on('ready', () => setIsConnected(true))
    apiPromise.on('error', (error) => {
      console.log(error)
      setIsConnected(false)
    })
  }, [])

  return {
    isConnected: isConnected,
    api: api,
  }
}
