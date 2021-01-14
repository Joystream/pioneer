import React, { createContext, Dispatch, ReactNode, Reducer, useContext, useReducer } from 'react'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import keyring, { Keyring } from '@polkadot/ui-keyring'

const socket = 'ws://127.0.0.1:9944'
const types = { Address: 'AccountId', LookupSource: 'AccountId' }

interface State {
  socket: string
  jsonrpc: typeof jsonrpc
  types: typeof types
  keyring?: Keyring | null
  keyringState?: string | null
  api?: ApiPromise | null
  apiError?: string | null
  apiState?: string | null
}

const INIT_STATE: State = {
  socket: socket,
  jsonrpc: jsonrpc,
  types: types,
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
}

interface SubstrateAction<T> {
  type: T
}

interface SubstrateActionWithPayload<T, P> extends SubstrateAction<T> {
  payload: P
}

type Connect = SubstrateActionWithPayload<'CONNECT', ApiPromise>
type ConnectInit = SubstrateAction<'CONNECT_INIT'>
type ConnectSuccess = SubstrateAction<'CONNECT_SUCCESS'>
type ConnectError = SubstrateActionWithPayload<'CONNECT_ERROR', string>
type LoadKeyring = SubstrateAction<'LOAD_KEYRING'>
type SetKeyring = SubstrateActionWithPayload<'SET_KEYRING', Keyring>
type KeyringError = SubstrateAction<'KEYRING_ERROR'>

type Action = ConnectInit | Connect | ConnectSuccess | ConnectError | LoadKeyring | SetKeyring | KeyringError

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' }

    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' }

    case 'CONNECT_SUCCESS':
      return { ...state, apiState: 'READY' }

    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload }

    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' }

    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' }

    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' }
  }

  return state
}

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

const SubstrateContext = createContext<State>(INIT_STATE)

interface Props {
  children: ReactNode
}

const SubstrateContextProvider = (props: Props) => {
  // filtering props and merge with default param value
  const initState: State = { ...INIT_STATE }
  const [state, dispatch] = useReducer(reducer, initState)

  connect(state, dispatch)
  loadAccounts(state, dispatch)

  return <SubstrateContext.Provider value={state}>{props.children}</SubstrateContext.Provider>
}

const useSubstrate = () => ({ ...useContext(SubstrateContext) })

export { SubstrateContextProvider, useSubstrate }
