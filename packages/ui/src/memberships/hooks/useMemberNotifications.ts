import { useMemo } from 'react'

import { useMyRoleIds } from '@/memberships/hooks/useMyRoleIds'
import { useGetMemberRoleEventsQuery } from '@/working-groups/queries'
import { asStakeChangedActivity } from '@/working-groups/types/WorkingGroupActivity'

export const useMemberNotifications = () => {
  const { workerIds } = useMyRoleIds()
  const { loading, data } = useGetMemberRoleEventsQuery({ variables: { worker_in: workerIds } })
  const activities = useMemo(
    () =>
      data
        ? [
            ...data.stakeDecreasedEvents.map(asStakeChangedActivity),
            ...data.stakeIncreasedEvents.map(asStakeChangedActivity),
          ]
        : [],
    [loading, data, workerIds.length]
  )
  return {
    activities,
    isLoading: loading,
  }
}
