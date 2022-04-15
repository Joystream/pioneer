import { useMemo } from 'react'

import { useIsCouncilMember } from '@/memberships/hooks/useIsCouncilMember'
import { Member } from '@/memberships/types'

export const useIsVoteStakeLocked = (candidate?: Member, electionFinished?: boolean) => {
  const isCouncilMember = useIsCouncilMember(candidate)
  return useMemo(() => {
    // Lock stake if the vote was cast: in current election or to winning candidate
    // Enable stake recovery if election is finished
    return !!candidate && (!electionFinished || isCouncilMember)
  }, [electionFinished, candidate])
}
