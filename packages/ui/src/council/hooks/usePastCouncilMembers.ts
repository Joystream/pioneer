import { useMemo } from 'react'

import { useGetCouncilBlockRangeQuery, useGetPastCouncilMembersQuery } from '@/council/queries'
import { asPastCouncilMember } from '@/council/types/PastCouncilMember'

export const usePastCouncilMembers = (cycleId: number) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({
    variables: { where: { councilElections_some: { cycleId } } },
  })
  const { fromBlock, toBlock } = useMemo(() => {
    return {
      fromBlock: rangeData?.electedCouncilByUniqueInput?.electedAtBlock ?? 0,
      toBlock: rangeData?.electedCouncilByUniqueInput?.endedAtBlock ?? 0,
    }
  }, [loadingRange, JSON.stringify(rangeData)])

  const { loading: loadingCouncilData, data } = useGetPastCouncilMembersQuery({
    variables: { cycleId, fromBlock, toBlock },
  })

  return {
    isLoading: loadingRange || loadingCouncilData,
    councilMembers: data && data.councilMembers.map(asPastCouncilMember(data?.proposalVotedEvents ?? [])),
  }
}
