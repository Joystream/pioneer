import React, { Dispatch, ReactNode, useReducer } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import keyring from '@polkadot/ui-keyring'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { Action, reducer, State, types } from './reducer'
import { SubstrateContext } from './context'

const socket = 'ws://127.0.0.1:9944'

const connect = (state: State, dispatch: Dispatch<Action>) => {
  const { apiState, socket, jsonrpc, types } = state
  // We only want this function to be performed once
  if (apiState) return

  dispatch({ type: 'CONNECT_INIT' })

  const provider = new WsProvider(socket)
  const apiPromise = new ApiPromise({ provider, types, rpc: jsonrpc })

  // Set listeners for disconnection and reconnection event.
  apiPromise.on('connected', () => {
    dispatch({ type: 'CONNECT', payload: apiPromise })
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    apiPromise.isReady.then(() => dispatch({ type: 'CONNECT_SUCCESS' }))
  })
  apiPromise.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }))
  apiPromise.on('error', (err) => dispatch({ type: 'CONNECT_ERROR', payload: err }))
}

let loadAccts = false

const loadAccounts = (state: State, dispatch: Dispatch<Action>) => {
  const asyncLoadAccounts = async () => {
    dispatch({ type: 'LOAD_KEYRING' })
    try {
      await web3Enable('Pioneer')
      let allAccounts = await web3Accounts()
      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` },
      }))
      keyring.loadAll({ isDevelopment: true }, allAccounts)
      dispatch({ type: 'SET_KEYRING', payload: keyring })
    } catch (e) {
      console.error(e)
      dispatch({ type: 'KEYRING_ERROR' })
    }
  }

  const { keyringState } = state
  // If `keyringState` is not null `asyncLoadAccounts` is running.
  if (keyringState) return
  // If `loadAccts` is true, the `asyncLoadAccounts` has been run once.
  if (loadAccts) return dispatch({ type: 'SET_KEYRING', payload: keyring })

  // This is the heavy duty work
  loadAccts = true
  asyncLoadAccounts()
}

interface Props {
  children: ReactNode
}

export const SubstrateContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    socket: socket,
    jsonrpc: jsonrpc,
    types: types,
  })

  connect(state, dispatch)
  loadAccounts(state, dispatch)

  return <SubstrateContext.Provider value={state}>{props.children}</SubstrateContext.Provider>
}
