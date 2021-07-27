import { registry, types } from '@joystream/types'
import '@joystream/types/augment/augment-api'
import '@joystream/types/augment/augment-types'
import { ApiRx, WsProvider } from '@polkadot/api'
import rpc from '@polkadot/types/interfaces/jsonrpc'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'

import { NetworkType, useNetwork } from '../../hooks/useNetwork'

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

const endpoints: Record<NetworkType, string> = {
  local: 'ws://127.0.0.1:9944',
  'olympia-testnet': 'wss://olympia-dev.joystream.app/rpc',
}

const getEndPoint = (network: NetworkType) => {
  return endpoints[network] || endpoints['local']
}

export const ApiContextProvider = ({ children }: Props) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting')
  const [network] = useNetwork()

  const api = useMemo(() => {
    const provider = new WsProvider(getEndPoint(network))
    return new ApiRx({ provider, rpc, types, registry })
  }, [])

  useEffect(() => {
    api.isReady.subscribe(() => {
      setConnectionState('connected')

      api.on('connected', () => setConnectionState('connected'))
      api.on('disconnected', () => setConnectionState('disconnected'))
    })
  }, [api])

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
          api: api,
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
