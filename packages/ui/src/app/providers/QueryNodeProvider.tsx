import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React, { ReactNode } from 'react'

import { NetworkType, useNetwork } from '@/common/hooks/useNetwork'
import { ServerContextProvider } from '@/common/providers/server/provider'
import { makeServer } from '@/mocks/server'

interface Props {
  children: ReactNode
}

const endpointMap: Record<NetworkType, string> = {
  local: 'http://localhost:8081/graphql',
  'olympia-testnet': 'https://olympia-dev.joystream.app/query/server/graphql',
}

const getQueryNodeUri = (network: NetworkType) => endpointMap[network]

export const QueryNodeProvider = ({ children }: Props) => {
  const [network] = useNetwork()
  const client = new ApolloClient({
    uri: getQueryNodeUri(network),
    cache: new InMemoryCache(),
  })

  if (network === 'olympia-testnet') {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }

  return (
    <ServerContextProvider value={makeServer()}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ServerContextProvider>
  )
}
