import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import React, { ReactNode } from 'react'

const link = new HttpLink({
  uri: '/query-node',
  fetch: (uri, options) => fetch(uri, options),
})

export const MockApolloProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={new ApolloClient({ link, cache: new InMemoryCache() })}>{children}</ApolloProvider>
}
