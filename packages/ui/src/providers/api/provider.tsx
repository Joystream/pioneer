import React, { ReactNode, useEffect, useState } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { types } from '@joystream/types'
import { ApiContext } from './context'

interface Props {
  children: ReactNode
}
export interface UseApi {
  api: ApiPromise | undefined
  state: ApiState
  isConnected: boolean
}

type ApiState = 'CONNECTING' | 'CONNECTED' | 'ERROR'

export const ApiContextProvider = (props: Props) => {
  const [apiState, setApiState] = useState<ApiState>('CONNECTING')
  const [api, setApi] = useState<ApiPromise | undefined>(undefined)

  useEffect(() => {
    const provider = new WsProvider('ws://127.0.0.1:9944/')
    const apiPromise = new ApiPromise({ provider, rpc: jsonrpc, types })

    apiPromise.on('connected', () => {
      apiPromise.isReady.then(() => setApiState('CONNECTED'))
      setApi(apiPromise)
    })
    apiPromise.on('ready', () => setApiState('CONNECTED'))
    apiPromise.on('error', (error) => {
      console.log(error)
      setApiState('CONNECTED')
    })
  }, [])

  const retVal = {
    state: apiState,
    isConnected: apiState === 'CONNECTED',
    api: api,
  }

  return <ApiContext.Provider value={retVal}>{props.children}</ApiContext.Provider>
}
