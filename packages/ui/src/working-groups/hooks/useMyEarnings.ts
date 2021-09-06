import BN from 'bn.js'
import { startOfToday, subDays, subHours } from 'date-fns'

import { RewardPaidEventWhereInput } from '@/common/api/queries'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'

import { RewardPaidEventFieldsFragment, useGetRewardsQuery } from '../queries'

export interface UseMyEarnings {
  last24hours: BN | null
  month: BN | null
}

const getEarnings = (allEvents: RewardPaidEventFieldsFragment[]) => allEvents.reduce((a, b) => a + Number(b.amount), 0)

const getFilterTodayEvents = () => {
  const time = subHours(Date.now(), 24).getTime()
  return ({ createdAt }: { createdAt: string }) => new Date(createdAt).getTime() >= time
}

export function useMyEarnings(): UseMyEarnings {
  const { workers } = useMyWorkers()

  const where: RewardPaidEventWhereInput = {
    worker: { id_in: workers.map((worker) => worker.id) },
    createdAt_gte: subDays(startOfToday(), 30).toISOString(),
  }
  const { loading, data } = useGetRewardsQuery({ variables: { where } })

  if (loading || !data) {
    return {
      last24hours: null,
      month: null,
    }
  }

  const monthEarnings = getEarnings(data.rewardPaidEvents)
  const last24hoursEvents = data.rewardPaidEvents.filter(getFilterTodayEvents())
  const last24hoursEarnings = getEarnings(last24hoursEvents)

  return {
    last24hours: new BN(last24hoursEarnings),
    month: new BN(monthEarnings),
  }
}
