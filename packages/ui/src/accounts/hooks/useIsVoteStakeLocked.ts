import { Member } from '@/memberships/types'

export const useIsVoteStakeLocked = (
  candidate: Member | undefined,
  { isElectionFinished = true, isLatestElection = true }
) => {
  // Lock stake if the vote was cast: in current election or to winning candidate
  // Enable stake recovery if election is finished
  return isLatestElection && (!isElectionFinished || !!candidate?.isCouncilMember)
}
