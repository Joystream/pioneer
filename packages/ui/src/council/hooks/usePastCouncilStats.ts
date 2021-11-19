import { useGetCouncilBlockRangeQuery, useGetPastCouncilStatsQuery } from '@/council/queries'
import { getSpentOnProposals, getTotalSpent } from '@/council/types/PastCouncil'

export const usePastCouncilStats = (id: string) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({
    variables: {
      where: {
        id,
      },
    },
  })

  const council = rangeData?.electedCouncilByUniqueInput

  const { loading: loadingData, data } = useGetPastCouncilStatsQuery({
    variables: {
      startBlock: council?.electedAtBlock ?? 0,
      endBlock: council?.endedAtBlock ?? 0,
    },
  })

  return {
    isLoading: loadingRange || loadingData,
    proposalsApproved: data?.proposalsApproved?.totalCount ?? 0,
    proposalsRejected: (data?.proposalsRejected?.totalCount || 0) + (data?.proposalsSlashed?.totalCount || 0),
    totalSpent: data && getTotalSpent(data.budgetSpendingEvents),
    spentOnProposals: data && getSpentOnProposals(data.fundingRequestsApproved),
  }
}
