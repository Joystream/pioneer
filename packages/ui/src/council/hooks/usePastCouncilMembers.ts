import { useMemo } from 'react'

import { useGetCouncilBlockRangeQuery, useGetPastCouncilMembersQuery } from '@/council/queries'
import { asPastCouncilMember } from '@/council/types/PastCouncilMember'

export const usePastCouncilMembers = (councilId: string) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({
    variables: { where: { id: councilId } },
  })
  const { fromBlock, toBlock } = useMemo(() => {
    return {
      fromBlock: rangeData?.electedCouncilByUniqueInput?.electedAtBlock ?? 0,
      toBlock: rangeData?.electedCouncilByUniqueInput?.endedAtBlock ?? 0,
    }
  }, [loadingRange, JSON.stringify(rangeData)])

  const { loading: loadingCouncilData, data } = useGetPastCouncilMembersQuery({
    variables: {
      councilId,
      fromBlock,
      toBlock,
    },
  })

  return {
    isLoading: loadingRange || loadingCouncilData,
    councilMembers: data && data.councilMembers.map(asPastCouncilMember(data?.proposalVotedEvents ?? [])),
  }
}
