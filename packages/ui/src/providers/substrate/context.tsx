import { createContext } from 'react'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { State, types } from './reducer'

const socket = 'ws://127.0.0.1:9944'

export const SubstrateContext = createContext<State>({
  socket: socket,
  jsonrpc: jsonrpc,
  types: types,
})
