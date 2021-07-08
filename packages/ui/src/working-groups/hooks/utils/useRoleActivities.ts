import { useMemo } from 'react'

import { useGetWorkerEventsQuery } from '@/working-groups/queries'
import {
  asApplicationWithdrawnActivity,
  asAppliedOnOpeningActivity,
  asStakeChangedActivity,
  asStakeSlashedActivity,
  asWorkerExitedActivity,
  asWorkerStartedLeavingActivity,
  asWorkerTerminatedActivity,
} from '@/working-groups/types/WorkingGroupActivity'

export const useRoleActivities = (workerId: string, applicationId: string) => {
  const { data, loading } = useGetWorkerEventsQuery({ variables: { workerId, applicationId } })
  const activities = useMemo(
    () =>
      data
        ? [
            ...data.applicationWithdrawnEvents.map(asApplicationWithdrawnActivity),
            ...data.appliedOnOpeningEvents.map(asAppliedOnOpeningActivity),
            ...data.stakeDecreasedEvents.map(asStakeChangedActivity),
            ...data.stakeIncreasedEvents.map(asStakeChangedActivity),
            ...data.stakeSlashedEvents.map(asStakeSlashedActivity),
            ...data.terminatedLeaderEvents.map(asWorkerTerminatedActivity),
            ...data.terminatedWorkerEvents.map(asWorkerTerminatedActivity),
            ...data.workerExitedEvents.map(asWorkerExitedActivity),
            ...data.workerStartedLeavingEvents.map(asWorkerStartedLeavingActivity),
          ].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        : [],
    [data, loading]
  )
  return {
    isLoading: loading,
    activities,
  }
}
