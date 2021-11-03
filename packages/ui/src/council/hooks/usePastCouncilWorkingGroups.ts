import { useGetCouncilBlockRangeQuery, useGetPastCouncilWorkingGroupsQuery } from '@/council/queries'
import { asPastCouncilWorkingGroup } from '@/council/types/PastCouncilWorkingGroup'

export const usePastCouncilWorkingGroups = (id: string) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({
    variables: {
      where: {
        id,
      },
    },
  })

  const council = rangeData?.electedCouncilByUniqueInput

  const { loading: loadingData, data } = useGetPastCouncilWorkingGroupsQuery({
    variables: {
      fromBlock: council?.electedAtBlock ?? 0,
      toBlock: council?.endedAtBlock ?? 0,
    },
  })

  return {
    isLoading: loadingRange || loadingData,
    workingGroups:
      data &&
      data.workingGroups.map(
        asPastCouncilWorkingGroup(data.budgetSetEvents, data.rewardPaidEvents, data.newMissedRewardLevelReachedEvents)
      ),
  }
}
