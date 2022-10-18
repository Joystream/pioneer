import { useLatestElection } from '@/council/hooks/useLatestElection'
import { usePastElection } from '@/council/hooks/usePastElection'
import { useGetCouncilVotesQuery } from '@/council/queries'
import { CandidacyStatus } from '@/council/types'
import { useApplications } from '@/working-groups/hooks/useApplications'
import { useWorkerUnstakingPeriodEnd } from '@/working-groups/hooks/useWorkerUnstakingPeriodEnd'
import { useGetWorkerIdsQuery } from '@/working-groups/queries'

export const useIsWGLockRecoverable = (hasWGLock: boolean, stakingAccount: string) => {
  const { applications } = useApplications({
    stakingAccount,
    limit: 1,
    skip: !hasWGLock,
  })
  const { data: workerData } = useGetWorkerIdsQuery({
    variables: { where: { stakeAccount_eq: stakingAccount } },
    skip: !hasWGLock,
  })
  const workerId = workerData?.workers[0]?.id
  const { unstakingPeriodEnd } = useWorkerUnstakingPeriodEnd(workerId)

  if (applications[0]?.status === 'ApplicationStatusPending') {
    return true
  }

  if (applications[0]?.status === 'ApplicationStatusAccepted') {
    if (unstakingPeriodEnd) {
      return Date.parse(unstakingPeriodEnd) > Date.now()
    }
    return true
  }

  return false
}

export const useIsCandidateLockRecoverable = (hasCandidateLock: boolean, stakingAccount: string) => {
  const { election: latestElection } = useLatestElection({ skip: !hasCandidateLock })

  return (
    latestElection?.candidates?.find((candidate) => candidate.stakingAccount === stakingAccount)?.status !== 'ACTIVE'
  )
}

export const useIsVoteLockRecoverable = (hasVoteLock: boolean, stakingAccount: string) => {
  const { data: { castVotes: [vote] } = { castVotes: [] } } = useGetCouncilVotesQuery({
    variables: { where: { castBy_eq: stakingAccount, stakeLocked_eq: true } },
    skip: !hasVoteLock,
  })
  const { election: voteElection } = usePastElection(String(vote?.electionRound.cycleId ?? 0))

  const isElectionFinished = !!voteElection
  const { election: latestElection } = useLatestElection({ skip: !hasVoteLock || !isElectionFinished })
  const isInLatestElection = !isElectionFinished || latestElection?.cycleId === voteElection?.cycleId
  // Always recoverable when the vote was not cast during the latest election
  // Otherwise recoverable when the election is over and the voted for candidate was not elected
  return !isInLatestElection || (isElectionFinished && vote?.voteFor?.status !== CandidacyStatus.Elected)
}
