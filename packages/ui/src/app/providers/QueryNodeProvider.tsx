import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React, { ReactNode } from 'react'

import { NetworkType, useNetwork } from '@/common/hooks/useNetwork'
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

const getApolloClient = (network: 'local' | 'olympia-testnet') =>
  new ApolloClient({
    uri: ENDPOINTS[network],
    cache: new InMemoryCache(),
  })
