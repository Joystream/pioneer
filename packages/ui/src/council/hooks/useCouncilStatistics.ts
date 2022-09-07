import { useMemo } from 'react'
import { map } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

import { useCouncilRemainingPeriod } from './useCouncilRemainingPeriod'

export const useCouncilStatistics = () => {
  const { api } = useApi()
  const idlePeriodRemaining = useCouncilRemainingPeriod()

  const councilSize = api?.consts.council.councilSize
  const reward = useMemo(
    () => api?.query.council.councilorReward().pipe(map((councilorReward) => councilSize?.mul(councilorReward))),
    [councilSize]
  )
  const budgetAmount = useFirstObservableValue(() => api?.query.council.budget(), [api?.isConnected])
  const rewardAmount = useFirstObservableValue(() => reward, [api?.isConnected])

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
