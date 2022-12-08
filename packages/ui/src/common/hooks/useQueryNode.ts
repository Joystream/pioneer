import { SubscriptionHookOptions } from '@apollo/client'

import {
  GetQueryNodeStateSubscription,
  GetQueryNodeStateSubscriptionVariables,
  useGetQueryNodeStateSubscription,
} from '../api/queries'

export const useQueryNodeStateSubscription = (
  opts?: SubscriptionHookOptions<GetQueryNodeStateSubscription, GetQueryNodeStateSubscriptionVariables>
) => {
  const { data, ...rest } = useGetQueryNodeStateSubscription({ ...opts })
  // todo: in future implement query to poll the state instead of subscription

  return {
    queryNodeState: data?.stateSubscription,
    ...rest,
  }
}
