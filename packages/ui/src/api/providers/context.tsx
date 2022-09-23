import { createContext } from 'react'

import { UseApi } from './provider'

export const ApiContext = createContext<UseApi>({
  isConnected: false,
  api: undefined,
  connectionState: 'connecting',
  qnConnectionState: 'connecting',
  setQnConnectionState: () => undefined,
})
