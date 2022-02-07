import { registry, types } from '@joystream/types'
import '@joystream/types/augment/augment-api'
import '@joystream/types/augment/augment-types'
import { ApiRx, WsProvider } from '@polkadot/api'
import rpc from '@polkadot/types/interfaces/jsonrpc'
import React, { ReactNode, useEffect, useState } from 'react'

import { useNetwork } from '../../hooks/useNetwork'
import { useNetworkEndpoints } from '../../hooks/useNetworkEndpoints'

import { ApiContext } from './context'

interface Props {
  children: ReactNode
}

type ConnectionState = 'connecting' | 'connected' | 'disconnected'

interface BaseAPI {
  api?: ApiRx
  isConnected: boolean
  connectionState: ConnectionState
}

interface APIConnecting extends BaseAPI {
  api: undefined
  isConnected: false
  connectionState: 'connecting'
}

interface APIConnected extends BaseAPI {
  api: ApiRx
  isConnected: true
  connectionState: 'connected'
}

interface APIDisconnected extends BaseAPI {
  api: ApiRx
  isConnected: false
  connectionState: 'disconnected'
}

export type UseApi = APIConnecting | APIConnected | APIDisconnected

export const ApiContextProvider = ({ children }: Props) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting')
  const [network] = useNetwork()
  const [endpoints] = useNetworkEndpoints(network)
  const [api, setApi] = useState<ApiRx>()

  useEffect(() => {
    if (!endpoints.nodeRpcEndpoint) return

    const provider = new WsProvider(endpoints.nodeRpcEndpoint)
    const api = new ApiRx({ provider, rpc, types, registry })

    setApi(api)

    api.isReady.subscribe(() => {
      setConnectionState('connected')

      api.on('connected', () => setConnectionState('connected'))
      api.on('disconnected', () => setConnectionState('disconnected'))
    })
  }, [endpoints.nodeRpcEndpoint])

  if (connectionState === 'connecting') {
    return (
      <ApiContext.Provider
        value={{
          isConnected: false,
          api: undefined,
          connectionState,
        }}
      >
        {children}
      </ApiContext.Provider>
    )
  }

  if (api && connectionState === 'connected') {
    return (
      <ApiContext.Provider
        value={{
          isConnected: true,
          api: api,
          connectionState,
        }}
      >
        {children}
      </ApiContext.Provider>
    )
  }

  if (api && connectionState === 'disconnected') {
    return (
      <ApiContext.Provider
        value={{
          isConnected: false,
          api: api,
          connectionState,
        }}
      >
        {children}
      </ApiContext.Provider>
    )
  }

  return null
}
