import { registry, types } from '@joystream/types'
import '@joystream/types/augment/augment-api'
import '@joystream/types/augment/augment-types'
import { ApiRx, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import React, { ReactNode, useEffect, useState } from 'react'

import { NetworkType, useNetwork } from '../../hooks/useNetwork'

import { ApiContext } from './context'

interface Props {
  children: ReactNode
}

export interface UseApi {
  api: ApiRx | undefined
  isConnected: boolean
}

const endpoints: Record<NetworkType, string> = {
  local: 'ws://127.0.0.1:9944',
  'olympia-testnet': 'wss://olympia-dev.joystream.app/rpc',
}

const getEndPoint = (network: NetworkType) => {
  return endpoints[network] || endpoints['local']
}

export const ApiContextProvider = (props: Props) => {
  const [isConnected, setIsConnected] = useState(false)
  const [api, setApi] = useState<ApiRx | undefined>(undefined)
  const [network] = useNetwork()

  useEffect(() => {
    const provider = new WsProvider(getEndPoint(network))

    ApiRx.create({ provider, rpc: jsonrpc, types: types, registry }).subscribe((api) => {
      setApi(api)
      setIsConnected(true)

      api.on('connected', () => setIsConnected(true))
      api.on('disconnected', () => setIsConnected(false))
    })
  }, [])

  return <ApiContext.Provider value={{ isConnected, api }}>{props.children}</ApiContext.Provider>
}
