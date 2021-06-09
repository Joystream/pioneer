import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React, { ReactNode } from 'react'

import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { NetworkType } from '@/common/providers/api/provider'
import { ServerContextProvider } from '@/common/providers/server/provider'
import { makeServer } from '@/mocks/server'

interface Props {
  children: ReactNode
}

const getHydraUri = (network: NetworkType) => {
  if (network === 'olympia-testnet') {
    return 'https://olympia-dev.joystream.app/query/server/graphql'
  }

  return 'http://localhost:8081/graphql'
}

export const QueryNodeProvider = ({ children }: Props) => {
  const [network] = useLocalStorage<NetworkType>('network')
  const client = new ApolloClient({
    uri: getHydraUri(network),
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
