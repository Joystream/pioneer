import BN from 'bn.js'

import { BN_ZERO } from '@/common/constants'

import { GetRewardsQuery, useGetRewardsQuery } from '../queries'

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

const accumulator = (prev: BN, next: GetRewardsQuery['rewardPaidEvents'][number]) => prev.add(new BN(next.amount))

export const useWorkerEarnings = (workerId: string) => {
  const { loading, data } = useGetRewardsQuery({ variables: { where: { worker: { id_eq: workerId } } } })
  const earnings = data?.rewardPaidEvents.reduce(accumulator, BN_ZERO)

  const currentDayEarnings = data?.rewardPaidEvents
    .filter((event) => {
      // TODO use rewardPerBlock
      const dayAgo = Date.now() - DAY_IN_MILLISECONDS
      const eventDate = new Date(event.createdAt).getTime()
      return eventDate > dayAgo
    })
    .reduce(accumulator, BN_ZERO)

  return {
    isLoading: loading,
    earnings,
    currentDayEarnings,
  }
}
