import BN from 'bn.js'
import { subHours, startOfToday, subDays } from 'date-fns'

import { RewardPaidEventWhereInput } from '@/common/api/queries'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'

import { RewardPaidEventFieldsFragment, useGetRewardsQuery } from '../queries'

export interface UseMyEarnings {
  last24hours: BN | null
  month: BN | null
}

export function useMyEarnings(): UseMyEarnings {
  const { workers } = useMyWorkers()

  const where: RewardPaidEventWhereInput = {
    workerId_in: workers.map((worker) => worker.id),
    createdAt_gte: subDays(startOfToday(), 30).toISOString(),
  }
  const { loading, data } = useGetRewardsQuery({ variables: { where } })

  if (loading) {
    return {
      last24hours: null,
      month: null,
    }
  }

  const monthEarnings = data ? data.rewardPaidEvents.reduce((a, b) => a + Number(b.amount), 0) : 0

  const last24hoursEvents = data
    ? data.rewardPaidEvents.filter(
        (event: RewardPaidEventFieldsFragment) => new Date(event.createdAt) >= subHours(Date.now(), 24)
      )
    : []
  const last24hoursEarnings = last24hoursEvents.reduce((a, b) => a + Number(b.amount), 0)

  return { last24hours: new BN(last24hoursEarnings), month: new BN(monthEarnings) }
}
