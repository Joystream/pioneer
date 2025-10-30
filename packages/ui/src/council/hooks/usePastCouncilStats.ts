import { usePastCouncil } from '@/council/hooks/usePastCouncil'
import { useGetCouncilBlockRangeQuery, useGetPastCouncilStatsQuery } from '@/council/queries'
import { getSpentOnProposals } from '@/council/types/PastCouncil'

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

  const { isLoading: loadingCouncil, council: pastCouncil } = usePastCouncil(id)

  return {
    isLoading: loadingRange || loadingData || loadingCouncil,
    proposalsApproved: data?.proposalsApproved?.totalCount ?? 0,
    proposalsRejected: (data?.proposalsRejected?.totalCount || 0) + (data?.proposalsSlashed?.totalCount || 0),
    totalSpent: data && pastCouncil && pastCouncil.totalSpent,
    spentOnProposals: data && getSpentOnProposals(data.fundingRequestsApproved),
  }
}
