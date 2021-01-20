import { HashRouter } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { KeyringContextProvider } from './keyring/provider'
import { GlobalStyle } from './GlobalStyle'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <KeyringContextProvider>
      <HashRouter>
        <GlobalStyle />
        {props.children}
      </HashRouter>
    </KeyringContextProvider>
  )
}
