import { map } from 'rxjs'

import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export const useCouncilStatistics = () => {
  const { api, connectionState } = useApi()

  const councilSize = api?.consts.council.councilSize
  const reward = api?.query.council.councilorReward().pipe(map((councilorReward) => councilSize?.mul(councilorReward)))
  const budgetAmount = useObservable(api?.query.council.budget(), [connectionState])
  const rewardAmount = useObservable(reward, [connectionState])

  return {
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
