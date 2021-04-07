import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React, { ReactNode } from 'react'
import { HashRouter } from 'react-router-dom'

import { AccountsContextProvider } from '../accounts/providers/accounts/provider'
import { ApiContextProvider } from '../common/providers/api/provider'
import { KeyringContextProvider } from '../common/providers/keyring/provider'
import { ModalContextProvider } from '../common/providers/modal/provider'
import { ServerContextProvider } from '../common/providers/server/provider'
import { MembershipContextProvider } from '../memberships/providers/membership/provider'
import { Mocks } from '../mocks/Mocks'
import { makeServer } from '../mocks/server'

import { GlobalStyle } from './providers/GlobalStyle'

interface Props {
  children: ReactNode
}

const server = makeServer()

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache: new InMemoryCache(),
})

export const Providers = (props: Props) => (
  <KeyringContextProvider>
    <AccountsContextProvider>
      <ApiContextProvider>
        <ServerContextProvider value={server}>
          <ApolloProvider client={client}>
            <MembershipContextProvider>
              <HashRouter>
                <ModalContextProvider>
                  <Mocks />
                  <GlobalStyle />
                  {props.children}
                </ModalContextProvider>
              </HashRouter>
            </MembershipContextProvider>
          </ApolloProvider>
        </ServerContextProvider>
      </ApiContextProvider>
    </AccountsContextProvider>
  </KeyringContextProvider>
)
