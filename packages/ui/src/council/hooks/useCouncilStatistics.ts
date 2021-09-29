import { map } from 'rxjs'

import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export const useCouncilStatistics = () => {
  const { api, connectionState } = useApi()

  const councilSize = api?.consts.council.councilSize
  const reward = api?.query.council.councilorReward().pipe(map((councilorReward) => councilSize?.mul(councilorReward)))

  return {
    budget: {
      amount: useObservable(api?.query.council.budget(), [connectionState]),
      refillPeriod: api?.consts.council.budgetRefillPeriod,
    },
    reward: {
      amount: useObservable(reward, [connectionState]),
      period: api?.consts.council.electedMemberRewardPeriod,
    },
  }
}
