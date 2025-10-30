import { useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

import { useCouncilRemainingPeriod } from './useCouncilRemainingPeriod'

export const useCouncilStatistics = () => {
  const { api } = useApi()
  const idlePeriodRemaining = useCouncilRemainingPeriod()

  const councilSize = api?.consts.council.councilSize
  const singleCouncilorReward = useFirstObservableValue(() => api?.query.council.councilorReward(), [api?.isConnected])
  const fullCouncilReward = useMemo(
    () => singleCouncilorReward && councilSize?.mul(singleCouncilorReward),
    [councilSize, singleCouncilorReward]
  )

  const budgetAmount = useFirstObservableValue(() => api?.query.council.budget(), [api?.isConnected])

  return {
    idlePeriodRemaining,
    budget: {
      amount: budgetAmount,
      refillPeriod: api?.consts.council.budgetRefillPeriod,
    },
    reward: {
      singleCouncilorAmount: singleCouncilorReward,
      fullCouncilAmount: fullCouncilReward,
      period: api?.consts.council.electedMemberRewardPeriod,
    },
  }
}
