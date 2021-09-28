import { useApi } from '@/common/hooks/useApi'
import { useCouncilStatisticsQuery } from '@/council/queries'

export const useCouncilStatistics = () => {
  const { api } = useApi()
  const { loading, data } = useCouncilStatisticsQuery()

  return {
    isLoading: loading,
    budget: {
      amount: data?.budgetSetEvents[0]?.newBudget,
      PERIOD_LENGTHS: api?.consts.council.budgetRefillPeriod,
    },
    reward: {
      amount: data?.councilorRewardUpdatedEvents[0]?.rewardAmount,
      PERIOD_LENGTHS: api?.consts.council.electedMemberRewardPeriod,
    },
  }
}
