import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import React, { ReactNode } from 'react'

import { NetworkType, useNetwork } from '@/common/hooks/useNetwork'
import { error } from '@/common/logger'
import { ServerContextProvider } from '@/common/providers/server/provider'
import { makeServer } from '@/mocks/server'

interface Props {
  children: ReactNode
}

const QUERY_NODE_GRAPHQL_SUBSCRIPTION_URL = 'wss://olympia-dev.joystream.app/query/server/graphql'

const ENDPOINTS: Record<NetworkType, string> = {
  local: 'http://localhost:8081/graphql',
  'local-mocks': 'http://localhost:8081/graphql',
  'olympia-testnet': 'https://olympia-dev.joystream.app/query/server/graphql',
}

export const QueryNodeProvider = ({ children }: Props) => {
  const [network] = useNetwork()

  if (network === 'local-mocks') {
    return (
      <ServerContextProvider value={makeServer()}>
        <ApolloProvider client={getApolloClient(network)}>{children}</ApolloProvider>
      </ServerContextProvider>
    )
  }

  return <ApolloProvider client={getApolloClient(network)}>{children}</ApolloProvider>
}

const getApolloClient = (network: NetworkType) => {
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

  const queryLink = from([errorLink, httpLink])
  const subscriptionLink = new WebSocketLink({
    uri: QUERY_NODE_GRAPHQL_SUBSCRIPTION_URL,
    options: {
      reconnect: true,
      reconnectionAttempts: 5,
    },
  })

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    subscriptionLink,
    queryLink
  )

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'standby',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}
