import { useMemo } from 'react'

import { LatestElection } from '@/council/types/LatestElection'
import { useIsCouncilMember } from '@/memberships/hooks/useIsCouncilMember'
import { Member } from '@/memberships/types'

export const useIsVoteStakeLocked = (latestElection?: LatestElection, candidate?: Member) => {
  const isCouncilMember = useIsCouncilMember(candidate)
  return useMemo(() => {
    // Lock stake if the vote was cast: in current election or to winning candidate
    // Enable stake recovery if election is finished
    return !!candidate && (!latestElection?.isFinished || isCouncilMember)
  }, [latestElection, candidate])
}
