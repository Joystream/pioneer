import { useMemo } from 'react'

import { useGetGroupEventsQuery } from '@/working-groups/queries'
import {
  asApplicationWithdrawnActivity,
  asAppliedOnOpeningActivity,
  asBudgetSetActivity,
  asBudgetSpendingActivity,
  asOpeningActivity,
  asOpeningFilledActivity,
  asStakeChangedActivity,
  asStakeSlashedActivity,
  asStatusTextChangedEventActivities,
  asWorkerRewardAmountUpdatedActivity,
  asWorkerExitedActivity,
  asWorkerTerminatedActivity,
} from '@/working-groups/types/WorkingGroupActivity'

export const useGroupActivities = (groupId: string) => {
  const { loading, data } = useGetGroupEventsQuery({ variables: { group_eq: groupId } })
  const activities = useMemo(
    () =>
      data
        ? [
            ...data.appliedOnOpeningEvents.map(asAppliedOnOpeningActivity),
            ...data.applicationWithdrawnEvents.map(asApplicationWithdrawnActivity),
            ...data.budgetSpendingEvents.map(asBudgetSpendingActivity),
            ...data.stakeDecreasedEvents.map(asStakeChangedActivity),
            ...data.stakeIncreasedEvents.map(asStakeChangedActivity),
            ...data.stakeSlashedEvents.map(asStakeSlashedActivity),
            ...data.openingAddedEvents.map(asOpeningActivity),
            ...data.openingCanceledEvents.map(asOpeningActivity),
            ...data.openingFilledEvents.map(asOpeningFilledActivity),
            ...data.workerExitedEvents.map(asWorkerExitedActivity),
            ...data.workerRewardAmountUpdatedEvents.map(asWorkerRewardAmountUpdatedActivity),
            ...data.statusTextChangedEvents.map(asStatusTextChangedEventActivities),
            ...data.budgetSetEvents.map(asBudgetSetActivity),
            ...data.terminatedLeaderEvents.map(asWorkerTerminatedActivity),
            ...data.terminatedWorkerEvents.map(asWorkerTerminatedActivity),
          ]
            .flat()
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        : [],
    [data, loading]
  )

  return { isLoading: loading, activities }
}
