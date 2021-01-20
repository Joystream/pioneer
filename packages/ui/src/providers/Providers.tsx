import { HashRouter } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { KeyringContextProvider } from './keyring/provider'
import { GlobalStyle } from './GlobalStyle'
import { ApiContextProvider } from './api/provider'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <KeyringContextProvider>
      <ApiContextProvider>
        <HashRouter>
          <GlobalStyle />
          {props.children}
        </HashRouter>
      </ApiContextProvider>
    </KeyringContextProvider>
  )
}
