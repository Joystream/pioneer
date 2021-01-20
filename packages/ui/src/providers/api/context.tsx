import { createContext } from 'react'
import { UseApi } from './provider'

export const ApiContext = createContext<UseApi>({
  isConnected: false,
  state: 'CONNECTING',
  api: undefined,
})
