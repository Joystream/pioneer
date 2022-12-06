import { useGetCouncilBlockRangeQuery, useGetPastCouncilProposalsQuery } from '@/council/queries'
import { asProposal } from '@/proposals/types'

export const usePastCouncilProposals = (cycleId: number) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({
    variables: { where: { cycleId } },
  })

  const council = rangeData?.electedCouncilByUniqueInput

  const { loading: loadingData, data } = useGetPastCouncilProposalsQuery({
    variables: {
      fromBlock: council?.electedAtBlock ?? 0,
      toBlock: council?.endedAtBlock ?? 0,
    },
  })

  return {
    isLoading: loadingRange || loadingData,
    proposals: data && data.proposals.map(asProposal),
  }
}
