import { createContext } from 'react'

import { GetQueryNodeStateSubscription } from '@/common/api/queries'

interface IQueryNodeSubscriptionContext {
  isLoading: boolean
  queryNodeState: Omit<GetQueryNodeStateSubscription['stateSubscription'], '__typename'> | undefined
}

export const QueryNodeSubscriptionContext = createContext<IQueryNodeSubscriptionContext>({
  isLoading: false,
  queryNodeState: undefined,
})
