import { useMemo } from 'react'

import { useMyApplicationIds } from '@/working-groups/hooks/useMyApplicationIds'
import { useMyRoleIds } from '@/working-groups/hooks/useMyRoleIds'
import { useGetMemberRoleEventsQuery } from '@/working-groups/queries'
import {
  asApplicationWithdrawnActivity,
  asAppliedOnOpeningActivity,
  asStakeChangedActivity,
  asStakeSlashedActivity,
  asWorkerExitedActivity,
  asWorkerRewardAccountUpdatedActivity,
  asWorkerRewardAmountUpdatedActivity,
  asWorkerStartedLeavingActivity,
  asWorkerTerminatedActivity,
} from '@/working-groups/types/WorkingGroupActivity'

export const useMemberNotifications = () => {
  const { workerIds } = useMyRoleIds()
  const { applicationIds } = useMyApplicationIds()
  const { loading, data } = useGetMemberRoleEventsQuery({
    variables: { worker_in: workerIds, application_in: applicationIds },
  })
  const activities = useMemo(
    () =>
      data
        ? [
            ...data.appliedOnOpeningEvents.map(asAppliedOnOpeningActivity),
            ...data.applicationWithdrawnEvents.map(asApplicationWithdrawnActivity),
            ...data.stakeDecreasedEvents.map(asStakeChangedActivity),
            ...data.stakeIncreasedEvents.map(asStakeChangedActivity),
            ...data.stakeSlashedEvents.map(asStakeSlashedActivity),
            ...data.workerExitedEvents.map(asWorkerExitedActivity),
            ...data.workerStartedLeavingEvents.map(asWorkerStartedLeavingActivity),
            ...data.terminatedLeaderEvents.map(asWorkerTerminatedActivity),
            ...data.terminatedWorkerEvents.map(asWorkerTerminatedActivity),
            ...data.workerRewardAccountUpdatedEvents.map(asWorkerRewardAccountUpdatedActivity),
            ...data.workerRewardAmountUpdatedEvents.map(asWorkerRewardAmountUpdatedActivity),
          ]
            .flat()
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        : [],
    [loading, data, workerIds.length]
  )
  return {
    activities,
    isLoading: loading,
  }
}
