import { useCouncilBlockRange } from '@/council/hooks/useCouncilBlockRange'
import { useGetPastCouncilQuery, useGetPastCouncilWorkingGroupsQuery } from '@/council/queries'
import { asPastCouncilWithDetails } from '@/council/types/PastCouncil'

export const usePastCouncil = (id: string) => {
  const { loadingRange, fromBlock, toBlock } = useCouncilBlockRange(id)

  const { loading: loadingData, data: councilData } = useGetPastCouncilQuery({ variables: { id, fromBlock, toBlock } })

  const { loading: loadingWorkingGroup, data: workingGroupData } = useGetPastCouncilWorkingGroupsQuery({
    variables: {
      fromBlock: fromBlock,
      toBlock: toBlock,
    },
  })

  return {
    isLoading: loadingRange || loadingData || loadingWorkingGroup,
    council:
      councilData?.electedCouncilByUniqueInput &&
      councilData?.budgetSpendingEvents &&
      councilData?.fundingRequestsApproved &&
      workingGroupData?.rewardPaidEvents &&
      workingGroupData?.budgetUpdatedEvents &&
      workingGroupData?.channelPaymentMadeEvents &&
      asPastCouncilWithDetails(
        workingGroupData.rewardPaidEvents,
        workingGroupData.budgetUpdatedEvents,
        councilData.electedCouncilByUniqueInput,
        councilData.budgetSpendingEvents,
        councilData.fundingRequestsApproved,
        workingGroupData.channelPaymentMadeEvents
      ),
  }
}
