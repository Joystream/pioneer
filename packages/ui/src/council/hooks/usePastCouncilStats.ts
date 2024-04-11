import { usePastCouncil } from '@/council/hooks/usePastCouncil'
import { useGetPastCouncilStatsQuery } from '@/council/queries'

// NOTE: This hook is used for the past councils table. It's called once per row.
export const usePastCouncilStats = (id: string) => {
  const { isLoading: loadingCouncil, council: pastCouncil, term } = usePastCouncil(id)

  const { loading: loadingData, data } = useGetPastCouncilStatsQuery({
    variables: {
      startBlock: term?.fromBlock ?? 0,
      endBlock: term?.toBlock ?? 0,
    },
    skip: !term.toBlock,
  })

  return {
    isLoading: loadingData || loadingCouncil,
    proposalsApproved: data?.proposalsApproved?.totalCount ?? 0,
    proposalsRejected: (data?.proposalsRejected?.totalCount || 0) + (data?.proposalsSlashed?.totalCount || 0),
    totalSpent: pastCouncil?.totalSpent,
    spentOnProposals: pastCouncil?.totalSpentOnProposals,
  }
}
