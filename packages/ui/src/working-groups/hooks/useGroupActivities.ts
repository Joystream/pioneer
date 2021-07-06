import { useMemo } from 'react'

import { useGetGroupEventsQuery } from '@/working-groups/queries'
import {
  asApplicationWithdrawnActivity,
  asAppliedOnOpeningActivity,
  asBudgetSpendingActivity,
  asOpeningActivity,
  asOpeningFilledActivity,
  asStakeChangedActivity,
  asStatusTextChangedEventActivities,
  asWorkerExitedActivity,
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
            ...data.openingAddedEvents.map(asOpeningActivity),
            ...data.openingCanceledEvents.map(asOpeningActivity),
            ...data.openingFilledEvents.map(asOpeningFilledActivity),
            ...data.workerExitedEvents.map(asWorkerExitedActivity),
            ...data.statusTextChangedEvents.map(asStatusTextChangedEventActivities).flat(),
          ].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        : [],
    [data, loading]
  )

  return { isLoading: loading, activities }
}
