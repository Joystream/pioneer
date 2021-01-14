import { BrowserRouter } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { SubstrateContextProvider } from './SubstrateContext'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <SubstrateContextProvider>
      <BrowserRouter>{props.children}</BrowserRouter>
    </SubstrateContextProvider>
  )
}
