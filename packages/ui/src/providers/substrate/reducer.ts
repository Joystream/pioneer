import { Reducer } from 'react'
import { Keyring } from '@polkadot/ui-keyring'
import { ApiPromise } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'

export const types = { Address: 'AccountId', LookupSource: 'AccountId' }

export interface State {
  socket: string
  jsonrpc: typeof jsonrpc
  types: typeof types
  keyring?: Keyring | null
  keyringState?: 'LOADING' | 'READY' | 'ERROR' | null
  api?: ApiPromise | null
  apiError?: string | null
  apiState?: 'CONNECT_INIT' | 'CONNECTING' | 'READY' | 'ERROR' | null
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
export type Action = ConnectInit | Connect | ConnectSuccess | ConnectError | LoadKeyring | SetKeyring | KeyringError

export const reducer: Reducer<State, Action> = (state: State, action: Action) => {
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
