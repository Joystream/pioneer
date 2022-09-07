import React, { ReactNode, useEffect, useState } from 'react'
import { firstValueFrom } from 'rxjs'

import { Api } from '@/api'
import { useApiBenchmarking } from '@/api/hooks/useApiBenchmarking'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'

import { ApiContext } from './context'

interface Props {
  children: ReactNode
}

export type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error'

interface BaseAPI {
  api?: Api
  isConnected: boolean
  connectionState: ConnectionState
  qnConnectionState: ConnectionState
  setQnConnectionState: (state: ConnectionState) => void
}

interface APIConnecting extends BaseAPI {
  api: undefined
  isConnected: false
  connectionState: 'connecting'
}

interface APIConnected extends BaseAPI {
  api: Api
  isConnected: true
  connectionState: 'connected'
}

interface APIDisconnected extends BaseAPI {
  api: Api
  isConnected: false
  connectionState: 'disconnected'
}

export type UseApi = APIConnecting | APIConnected | APIDisconnected

export const ApiContextProvider = ({ children }: Props) => {
  const [api, setApi] = useState<Api>()
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting')
  const [qnConnectionState, setQnConnectionState] = useState<ConnectionState>('connecting')
  const [endpoints] = useNetworkEndpoints()

  useApiBenchmarking(api)

  useEffect(() => {
    firstValueFrom(Api.create(endpoints.nodeRpcEndpoint)).then((api) => {
      setApi(api)
      setConnectionState('connected')
      api.on('connected', () => setConnectionState('connected'))
      api.on('disconnected', () => setConnectionState('disconnected'))
    })
  }, [])

  if (connectionState === 'connecting') {
    return (
      <ApiContext.Provider
        value={{
          isConnected: false,
          api: undefined,
          connectionState,
          qnConnectionState,
          setQnConnectionState: setQnConnectionState,
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
          api: api as Api,
          connectionState,
          qnConnectionState,
          setQnConnectionState: setQnConnectionState,
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
          api: api as Api,
          connectionState,
          qnConnectionState,
          setQnConnectionState: setQnConnectionState,
        }}
      >
        {children}
      </ApiContext.Provider>
    )
  }

  return null
}
