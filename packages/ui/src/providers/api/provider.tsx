import React, { ReactNode, useEffect, useState } from 'react'
import { ApiRx, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { registry } from '@joystream/types'
import { ApiContext } from './context'

interface Props {
  children: ReactNode
}
export interface UseApi {
  api: ApiRx | undefined
  isConnected: boolean
}

export type Network = 'DEV' | 'TESTNET'

export const ApiContextProvider = (props: Props) => {
  const [isConnected, setIsConnected] = useState(false)
  const [api, setApi] = useState<ApiRx | undefined>(undefined)
  const network = 'DEV'

  useEffect(() => {
    const endpoint = network === 'DEV' ? 'ws://127.0.0.1:9944/' : 'wss://rome-rpc-endpoint.joystream.org:9944'
    const provider = new WsProvider(endpoint)

    ApiRx.create({ provider, rpc: jsonrpc, types: {}, registry })
      .toPromise()
      .then((api) => {
        setApi(api)
        setIsConnected(true)
      })
  }, [])

  const retVal = {
    isConnected: isConnected,
    api: api,
  }

  return <ApiContext.Provider value={retVal}>{props.children}</ApiContext.Provider>
}
