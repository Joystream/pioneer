import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import React, { ReactNode, useEffect, useState } from 'react'

import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'

import { BackendContext } from './context'

export const BackendProvider = (props: { children: ReactNode }) => {
  const [backendClient, setBackendClient] = useState<ApolloClient<any>>()
  const [endpoints] = useNetworkEndpoints()

  useEffect(() => {
    if (backendClient || !endpoints.backendEndpoint) return

    const client = new ApolloClient({
      link: new HttpLink({ uri: endpoints.backendEndpoint }),
      cache: new InMemoryCache(),
    })
    setBackendClient(client)
  }, [endpoints.backendEndpoint])

  return <BackendContext.Provider value={backendClient} {...props} />
}
