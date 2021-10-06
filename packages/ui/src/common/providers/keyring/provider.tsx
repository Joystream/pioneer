import { keyring } from '@polkadot/ui-keyring'
import React, { ReactNode } from 'react'

import { KeyringContext } from './context'

interface Props {
  children: ReactNode
}

export const KeyringContextProvider = (props: Props) => {
  return <KeyringContext.Provider value={keyring}>{props.children}</KeyringContext.Provider>
}
