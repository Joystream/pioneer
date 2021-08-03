import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import React, { ReactNode } from 'react'

import { NetworkType, useNetwork } from '@/common/hooks/useNetwork'
import { error } from '@/common/logger'
import { ServerContextProvider } from '@/common/providers/server/provider'
import { makeServer } from '@/mocks/server'

interface Props {
  children: ReactNode
}

const ENDPOINTS: Record<NetworkType, string> = {
  local: 'http://localhost:8081/graphql',
  'olympia-testnet': 'https://olympia-dev.joystream.app/query/server/graphql',
}

export const QueryNodeProvider = ({ children }: Props) => {
  const [network] = useNetwork()

  if (network === 'olympia-testnet') {
    return <ApolloProvider client={getApolloClient(network)}>{children}</ApolloProvider>
  }

  return (
    <ServerContextProvider value={makeServer()}>
      <ApolloProvider client={getApolloClient(network)}>{children}</ApolloProvider>
    </ServerContextProvider>
  )
}

const getApolloClient = (network: 'local' | 'olympia-testnet') => {
  const httpLink = new HttpLink({
    uri: ENDPOINTS[network],
  })

  const errorLink = onError((errorResponse) => {
    if (errorResponse.networkError) {
      error('Error connecting to query node')
    }

    if (errorResponse.graphQLErrors) {
      error('GraphQL error', errorResponse.graphQLErrors)
    }
  })

  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  })
}
