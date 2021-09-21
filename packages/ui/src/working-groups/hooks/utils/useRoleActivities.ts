import { useMemo } from 'react'

import { useGetWorkerEventsQuery } from '@/working-groups/queries'
import { WorkerWithDetails } from '@/working-groups/types'
import {
  asApplicationWithdrawnActivity,
  asAppliedOnOpeningActivity,
  asStakeChangedActivity,
  asStakeSlashedActivity,
  asWorkerExitedActivity,
  asWorkerStartedLeavingActivity,
  asWorkerTerminatedActivity,
} from '@/working-groups/types/WorkingGroupActivity'

export const useRoleActivities = (worker?: WorkerWithDetails | null) => {
  const variables = { workerId: worker?.id, applicationId: worker?.applicationId }
  const { data, loading } = useGetWorkerEventsQuery({ variables })
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
          ]
            .flat()
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        : [],
    [data, loading]
  )
  return {
    isLoading: loading,
    activities,
  }
}
