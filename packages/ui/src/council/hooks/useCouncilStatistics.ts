import { useMemo } from 'react'
import { map } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

import { useCouncilRemainingPeriod } from './useCouncilRemainingPeriod'

export const useCouncilStatistics = () => {
  const { api, connectionState } = useApi()
  const idlePeriodRemaining = useCouncilRemainingPeriod()

  const councilSize = api?.consts.council.councilSize
  const reward = useMemo(
    () => api?.query.council.councilorReward().pipe(map((councilorReward) => councilSize?.mul(councilorReward))),
    [councilSize]
  )
  const budgetAmount = useObservable(api?.query.council.budget(), [connectionState])
  const rewardAmount = useObservable(reward, [connectionState])

  return {
    idlePeriodRemaining,
    budget: {
      amount: budgetAmount,
      refillPeriod: api?.consts.council.budgetRefillPeriod,
    },
    reward: {
      amount: rewardAmount,
      period: api?.consts.council.electedMemberRewardPeriod,
    },
  }
}
