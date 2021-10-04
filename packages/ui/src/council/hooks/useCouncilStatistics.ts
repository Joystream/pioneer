import { useMemo } from 'react'
import { map } from 'rxjs'

import { useApi } from '@/common/hooks/useApi'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { useObservable } from '@/common/hooks/useObservable'
import { isDefined } from '@/common/utils'

export const useCouncilStatistics = (electedAtBlock?: number) => {
  const { api, connectionState } = useApi()
  const currentBlock = useCurrentBlockNumber()

  const councilSize = api?.consts.council.councilSize
  const reward = useMemo(
    () => api?.query.council.councilorReward().pipe(map((councilorReward) => councilSize?.mul(councilorReward))),
    [councilSize]
  )
  const budgetAmount = useObservable(api?.query.council.budget(), [connectionState])
  const rewardAmount = useObservable(reward, [connectionState])

  const idlePeriodDuration = api?.consts.council.idlePeriodDuration
  const idlePeriodEnd = isDefined(electedAtBlock) ? idlePeriodDuration?.addn(electedAtBlock) : undefined

  return {
    idlePeriodRemaining: currentBlock && idlePeriodEnd?.sub(currentBlock),
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
