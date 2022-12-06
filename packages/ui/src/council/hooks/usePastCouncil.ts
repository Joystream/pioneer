import { useCouncilBlockRange } from '@/council/hooks/useCouncilBlockRange'
import { useGetPastCouncilQuery } from '@/council/queries'
import { asPastCouncilWithDetails } from '@/council/types/PastCouncil'

export const usePastCouncil = (cycleId: number) => {
  const { loadingRange, fromBlock, toBlock } = useCouncilBlockRange(cycleId)

  const { loading: loadingData, data: councilData } = useGetPastCouncilQuery({
    variables: { cycleId, fromBlock, toBlock },
  })

  return {
    isLoading: loadingRange || loadingData,
    council:
      councilData?.electedCouncilByUniqueInput &&
      councilData?.budgetSpendingEvents &&
      councilData?.fundingRequestsApproved &&
      asPastCouncilWithDetails(
        councilData.electedCouncilByUniqueInput,
        councilData.budgetSpendingEvents,
        councilData.fundingRequestsApproved
      ),
  }
}
