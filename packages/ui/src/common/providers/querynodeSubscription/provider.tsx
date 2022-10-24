import React, { FC, useEffect } from 'react'

import { useQueryNodeStateSubscription } from '@/common/hooks/useQueryNode'
import { info } from '@/common/logger'
import { QueryNodeSubscriptionContext } from '@/common/providers/querynodeSubscription/context'

export const QueryNodeSubscriptionProvider: FC = ({ children }) => {
  const { queryNodeState, loading, error } = useQueryNodeStateSubscription({ shouldResubscribe: true })

  useEffect(() => {
    if (!error) {
      return
    }

    info('Failed to subscribe to query node state')
  }, [error])

  return (
    <QueryNodeSubscriptionContext.Provider
      value={{
        queryNodeState,
        isLoading: loading,
      }}
    >
      {children}
    </QueryNodeSubscriptionContext.Provider>
  )
}
