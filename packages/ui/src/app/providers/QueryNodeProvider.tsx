import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import React, { ReactNode } from 'react'

import { NetworkType, QUERY_NODE_ENDPOINT, QUERY_NODE_ENDPOINT_SUBSCRIPTION } from '@/app/config'
import { useNetwork } from '@/common/hooks/useNetwork'
import { error } from '@/common/logger'
import { ServerContextProvider } from '@/common/providers/server/provider'
import { makeServer } from '@/mocks/server'

interface Props {
  children: ReactNode
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
    uri: QUERY_NODE_ENDPOINT[network],
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
    uri: QUERY_NODE_ENDPOINT_SUBSCRIPTION[network],
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
