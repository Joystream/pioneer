import { useCouncilBlockRange } from '@/council/hooks/useCouncilBlockRange'
import { useGetPastCouncilQuery } from '@/council/queries'
import { asPastCouncilWithDetails } from '@/council/types/PastCouncil'

export const usePastCouncil = (id: string) => {
  const { loadingRange, fromBlock, toBlock } = useCouncilBlockRange(id)

  const { loading: loadingData, data: councilData } = useGetPastCouncilQuery({ variables: { id, fromBlock, toBlock } })

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
