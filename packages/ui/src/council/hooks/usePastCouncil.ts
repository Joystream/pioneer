import {
  useGetCouncilBlockRangeQuery,
  useGetPastCouncilQuery,
  useGetPastCouncilWorkingGroupsQuery,
} from '@/council/queries'
import { asPastCouncilWithDetails } from '@/council/types/PastCouncil'

export const usePastCouncil = (id: string) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({ variables: { where: { id } } })
  const term = {
    fromBlock: rangeData?.electedCouncilByUniqueInput?.electedAtBlock ?? 0,
    toBlock: rangeData?.electedCouncilByUniqueInput?.endedAtBlock ?? 0,
  }

  const { loading: loadingData, data: councilData } = useGetPastCouncilQuery({
    variables: { id, ...term },
    skip: !term.toBlock,
  })

  const { loading: loadingWorkingGroup, data: workingGroupData } = useGetPastCouncilWorkingGroupsQuery({
    variables: term,
    skip: !term.toBlock,
  })

  return {
    isLoading: loadingRange || loadingData || loadingWorkingGroup,
    term,
    council:
      councilData?.electedCouncilByUniqueInput &&
      councilData?.fundingRequestsApproved &&
      workingGroupData?.rewardPaidEvents &&
      workingGroupData?.budgetUpdatedEvents &&
      workingGroupData?.channelPaymentMadeEvents &&
      asPastCouncilWithDetails(
        workingGroupData.rewardPaidEvents,
        workingGroupData.budgetUpdatedEvents,
        councilData.electedCouncilByUniqueInput,
        councilData.fundingRequestsApproved,
        workingGroupData.channelPaymentMadeEvents
      ),
  }
}
