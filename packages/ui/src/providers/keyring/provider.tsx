import React, { ReactNode } from 'react'
import keyring from '@polkadot/ui-keyring'
import { KeyringContext } from './context'

interface Props {
  children: ReactNode
}

export const KeyringContextProvider = (props: Props) => (
  <KeyringContext.Provider value={keyring}>{props.children}</KeyringContext.Provider>
)
