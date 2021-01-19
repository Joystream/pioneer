import React, { ReactNode, useEffect, useState } from 'react'
import { ApiContext } from './context'
import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'

interface Props {
  children: ReactNode
}
export interface UseApi {
  isConnected: boolean
  api: ApiPromise | undefined
}

export const ApiContextProvider = (props: Props) => {
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

  const retVal = {
    isConnected: isConnected,
    api: api,
  }

  return <ApiContext.Provider value={retVal}>{props.children}</ApiContext.Provider>
}
