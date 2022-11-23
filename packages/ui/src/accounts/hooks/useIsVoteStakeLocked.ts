import { Member } from '@/memberships/types'

export const useIsVoteStakeLocked = (
  candidate: Member | undefined,
  { isElectionFinished = true, isLatestElection = true }
) => {
  // Always allow stake recovery for votes not cast in the latest election
  // also allow when both the election is over and the voted for candidate lost
  return isLatestElection && (!isElectionFinished || !!candidate?.isCouncilMember)
}
