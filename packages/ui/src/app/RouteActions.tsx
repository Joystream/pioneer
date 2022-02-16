import React, { ReactNode, useEffect } from 'react'

import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'

interface Props {
  children: ReactNode
}

export const RouteActions = ({ children }: Props) => {
  const query = useRouteQuery()
  const [, updateNetworkConfig] = useNetworkEndpoints()

  useEffect(() => {
    const configEndpoint = query.get('network-config') ?? query.get('networkConfig')
    if (configEndpoint) {
      updateNetworkConfig(configEndpoint)

      // Remove the query
      window.location.replace(window.location.href.replace(/\?.*/, ''))
    }
  }, [query])

  return <>{children}</>
}
