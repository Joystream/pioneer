import { BrowserRouter } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { KeyringContextProvider } from './keyring/provider'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <KeyringContextProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>{props.children}</BrowserRouter>
    </KeyringContextProvider>
  )
}
