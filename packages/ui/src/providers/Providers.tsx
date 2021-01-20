import { HashRouter } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { KeyringContextProvider } from './keyring/provider'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <KeyringContextProvider>
      <HashRouter>{props.children}</HashRouter>
    </KeyringContextProvider>
  )
}
