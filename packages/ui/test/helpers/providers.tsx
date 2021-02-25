import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import React, { ReactNode } from 'react'
import { MembershipContextProvider } from '../../src/providers/membership/provider'

const link = new HttpLink({
  uri: '/query-node',
  fetch: (uri, options) => fetch(uri, options),
})

interface Props {
  children: ReactNode
}

export const MockApolloProvider = ({ children }: Props) => {
  return <ApolloProvider client={new ApolloClient({ link, cache: new InMemoryCache() })}>{children}</ApolloProvider>
}

export const MockQueryNodeProviders = ({ children }: Props) => {
  return (
    <MockApolloProvider>
      <MembershipContextProvider>{children}</MembershipContextProvider>
    </MockApolloProvider>
  )
}
