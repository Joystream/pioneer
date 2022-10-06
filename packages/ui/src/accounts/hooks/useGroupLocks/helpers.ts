import { useLatestElection } from '@/council/hooks/useLatestElection'
import { usePastElection } from '@/council/hooks/usePastElection'
import { GetCouncilVotesQuery, useGetCouncilVotesQuery } from '@/council/queries'
import { LatestElection } from '@/council/types/LatestElection'
import { useWorkerUnstakingPeriodEnd } from '@/working-groups/hooks/useWorkerUnstakingPeriodEnd'
import {
  GetWorkingGroupApplicationsQuery,
  useGetWorkerIdsQuery,
  useGetWorkingGroupApplicationsQuery,
} from '@/working-groups/queries'

export const isWGLockRecoverable = (
  application?: GetWorkingGroupApplicationsQuery['workingGroupApplications'][number],
  unstakingPeriodEnd?: string
) => {
  if (application?.status.__typename === 'ApplicationStatusPending') {
    return true
  }

  if (application?.status.__typename === 'ApplicationStatusAccepted') {
    if (unstakingPeriodEnd) {
      return Date.parse(unstakingPeriodEnd) > Date.now()
    }
    return true
  }

  return false
}

export const isCandidateLockRecoverable = (
  latestElectionCandidates: LatestElection['candidates'] | undefined,
  address: string
) => latestElectionCandidates?.find((candidate) => candidate.stakingAccount === address)?.status !== 'ACTIVE'

export const isVoteLockRecoverable = (
  vote: GetCouncilVotesQuery['castVotes'][number] | undefined,
  isLatestElection: boolean
) => !(isLatestElection || vote?.voteFor?.member.isCouncilMember)

export const useLockOrientedAddressInformation = (address: string) => {
  const { data: possibleApplications } = useGetWorkingGroupApplicationsQuery({
    variables: { where: { stakingAccount_eq: address } },
  })
  const application = possibleApplications?.workingGroupApplications[0]
  const { data: workerData } = useGetWorkerIdsQuery({ variables: { where: { stakeAccount_eq: address } } })
  const workerId = workerData?.workers[0]?.id
  const { unstakingPeriodEnd } = useWorkerUnstakingPeriodEnd(workerId)
  const { data: possibleVotes } = useGetCouncilVotesQuery({ variables: { where: { castBy_eq: address } } })
  const { election: latestElection } = useLatestElection()
  const vote = possibleVotes?.castVotes.find((vote) => vote.stakeLocked)
  const { election: voteElection } = usePastElection(String(vote?.electionRound.cycleId ?? 0))

  return {
    latestElection,
    voteElection,
    application,
    unstakingPeriodEnd,
    vote,
  }
}
