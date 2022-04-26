import { registry, types } from '@joystream/types'
import '@joystream/types/augment/augment-api'
import '@joystream/types/augment/augment-types'
import { ApiRx, WsProvider } from '@polkadot/api'
import rpc from '@polkadot/types/interfaces/jsonrpc'
import React, { ReactNode, useEffect, useState } from 'react'
import { firstValueFrom } from 'rxjs'

import { useApiBenchmarking } from '@/api/hooks/useApiBenchmarking'

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
  const [api, setApi] = useState<ApiRx>()
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting')
  const [endpoints] = useNetworkEndpoints()

  useApiBenchmarking(api)

  useEffect(() => {
    const provider = new WsProvider(endpoints.nodeRpcEndpoint)
    firstValueFrom(ApiRx.create({ provider, rpc, types, registry })).then(async (api) => {
      setApi(api)
      setConnectionState('connected')
      api.on('connected', () => setConnectionState('connected'))
      api.on('disconnected', () => setConnectionState('disconnected'))
    })

    return () => {
      if (api) {
        api.disconnect()
      }
    }
  }, [])

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

  if (connectionState === 'connected') {
    return (
      <ApiContext.Provider
        value={{
          isConnected: true,
          api: api as ApiRx,
          connectionState,
        }}
      >
        {children}
      </ApiContext.Provider>
    )
  }

  if (connectionState === 'disconnected') {
    return (
      <ApiContext.Provider
        value={{
          isConnected: false,
          api: api as ApiRx,
          connectionState,
        }}
      >
        {children}
      </ApiContext.Provider>
    )
  }

  return null
}
