import { debounce } from 'lodash'
import React, { ReactNode, useEffect, useState, useMemo } from 'react'
import { firstValueFrom } from 'rxjs'

import { Api } from '@/api'
import { useApiBenchmarking } from '@/api/hooks/useApiBenchmarking'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'

import { ApiContext } from './context'

interface Props {
  children: ReactNode
}

export interface LogItem {
  state: string
  time: Date
  provider: string
}

export type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error'

interface BaseAPI {
  api?: Api
  isConnected: boolean
  connectionState: ConnectionState
  qnConnectionState: ConnectionState
  setQnConnectionState: (state: ConnectionState) => void
  history?: LogItem[]
  message?: string
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

interface APIError extends BaseAPI {
  isConnected: false
  connectionState: 'error'
  message?: string
}

export type UseApi = APIConnecting | APIConnected | APIDisconnected | APIError

export const ApiContextProvider = ({ children }: Props) => {
  const [endpoints] = useNetworkEndpoints()
  const provider = useMemo(() => endpoints.nodeRpcEndpoint, [endpoints])
  const [api, setApi] = useState<Api>()
  const [connectionState, setApiState] = useState<ConnectionState>('connecting')
  const [qnConnectionState, setQnConnectionState] = useState<ConnectionState>('connecting')
  const [history, setLog] = useState<LogItem[]>([])
  const [lastChange, setLastChange] = useState<Date>(new Date())
  useApiBenchmarking(api) // benchmarks max possible queries for 1s every 6s, disabled per default

  const baseState = {
    isConnected: false,
    api: undefined,
    connectionState,
    qnConnectionState,
    setQnConnectionState,
    history,
  }
  const states = {
    connecting: { ...baseState, isConnected: false } as APIConnecting,
    connected: { ...baseState, isConnected: true, api: api as Api } as APIConnected,
    disconnected: { ...baseState, isConnected: false, api: api as Api } as APIDisconnected,
    error: { ...baseState, isConnected: false, api: api as Api, message: 'TODO' } as APIError,
  }

  const log = (state: string, time: Date = new Date()) => {
    setLog(history.concat({ state, time, provider }))
    setLastChange(time)
  }

  const handleStatus = (state: ConnectionState) => {
    setApiState(state)
    log(state)
  }

  const connectApi = () => {
    firstValueFrom(Api.create(provider)).then((api) => {
      setApi(api)
      handleStatus('connected')
      api.on('connected', () => handleStatus('connected'))
      api.on('disconnected', () => handleStatus('disconnected'))
    })
  }

  const handleReconnect = (api?: Api) => {
    const age = new Date().valueOf() - lastChange.valueOf()
    const info = ` ${connectionState} ${age}ms ago`
    if (connectionState === 'connected' || age < 59_000) return log('skipping api reconnect' + info)

    log('resetting api connection' + info)
    // TODO not implemented in ProxyAPI: api?.disconnect() // possible leak? api#3026 api#2257 wasm#17
    connectApi()
  }

  useMemo(() => {
    // TODO factor out time constants in network providers
    const scheduleReconnect = (api?: Api) => debounce(() => handleReconnect(api), 60_000)

    // api's supposed to handle reconnects automatically.
    // https://polkadot.js.org/docs/api/start/create#failures
    // IFF that fails however reset api after grace period.
    if (connectionState === 'disconnected') scheduleReconnect(api)
  }, [connectionState])

  useEffect(connectApi, [])
  return <ApiContext.Provider value={states[connectionState]}>{children}</ApiContext.Provider>
}
