import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React, { ReactNode } from 'react'
import { HashRouter } from 'react-router-dom'
import { ApiContextProvider } from './api/provider'
import { GlobalStyle } from './GlobalStyle'
import { KeyringContextProvider } from './keyring/provider'
import { MembershipContextProvider } from './membership/provider'

interface Props {
  children: ReactNode
}

const client = new ApolloClient({
  uri: '/query-node',
  cache: new InMemoryCache(),
})

export const Providers = (props: Props) => (
  <KeyringContextProvider>
    <ApiContextProvider>
      <ApolloProvider client={client}>
        <MembershipContextProvider>
          <HashRouter>
            <GlobalStyle />
            {props.children}
          </HashRouter>
        </MembershipContextProvider>
      </ApolloProvider>
    </ApiContextProvider>
  </KeyringContextProvider>
)
