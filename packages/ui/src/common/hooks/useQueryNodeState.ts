import { useContext } from 'react'

import { QueryNodeSubscriptionContext } from '@/common/providers/querynodeSubscription/context'

export const useQueryNodeState = () => useContext(QueryNodeSubscriptionContext)
