import React, { ReactNode, useEffect, useState } from 'react'
import { ApiRx, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { types } from '@joystream/types'
import { ApiContext } from './context'
import { useLocalStorage } from '../../hooks/useLocalStorage'

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
  const [network] = useLocalStorage<Network>('network')

  useEffect(() => {
    const endpoint = network === 'DEV' ? 'ws://127.0.0.1:9944/' : 'wss://rome-rpc-endpoint.joystream.org:9944'
    const provider = new WsProvider(endpoint)

    ApiRx.create({ provider, rpc: jsonrpc, types })
      .toPromise()
      .then((api) => {
        setApi(api)
        setIsConnected(true)

        api.isConnected.subscribe(setIsConnected)
      })
  }, [])

  const retVal = {
    isConnected: isConnected,
    api: api,
  }

  return <ApiContext.Provider value={retVal}>{props.children}</ApiContext.Provider>
}
