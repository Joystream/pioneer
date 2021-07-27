import { ApiRx } from '@polkadot/api'
import { createContext } from 'react'

import { UseApi } from './provider'

export const ApiContext = createContext<UseApi>({
  isConnected: false,
  api: ({} as unknown) as ApiRx,
  connectionState: 'connecting',
})
