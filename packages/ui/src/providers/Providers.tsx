import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { HashRouter } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { KeyringContextProvider } from './keyring/provider'
import { GlobalStyle } from './GlobalStyle'
import { ApiContextProvider } from './api/provider'

interface Props {
  children: ReactNode
}

const client = new ApolloClient({
  uri: '/query-node',
  cache: new InMemoryCache(),
})

export function Providers(props: Props) {
  return (
    <KeyringContextProvider>
      <ApiContextProvider>
        <ApolloProvider client={client}>
          <HashRouter>
            <GlobalStyle />
            {props.children}
          </HashRouter>
        </ApolloProvider>
      </ApiContextProvider>
    </KeyringContextProvider>
  )
}
