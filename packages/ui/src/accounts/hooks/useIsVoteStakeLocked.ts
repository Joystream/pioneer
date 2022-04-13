import { useMemo } from 'react'

import { LatestElection } from '@/council/types/LatestElection'
import { Member } from '@/memberships/types'

export const useIsVoteStakeLocked = (latestElection?: LatestElection, candidate?: Member) => {
  return useMemo(() => {
    // Lock stake if the vote was cast: in current election or to winning candidate
    // Enable stake recovery if election is finished
    return !!candidate && (!latestElection?.isFinished || candidate.isCouncilMember)
  }, [latestElection, candidate])
}
