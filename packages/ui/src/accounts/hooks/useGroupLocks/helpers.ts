import { useLatestElection } from '@/council/hooks/useLatestElection'
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
  const status = applications[0]?.status

  if (!hasWGLock) return

  if (status === 'ApplicationStatusAccepted') {
    if (unstakingPeriodEnd) {
      return Date.parse(unstakingPeriodEnd) > Date.now()
    }
    return false
  }

  return !!(status && status !== 'ApplicationStatusWithdrawn')
}

export const useIsCandidateLockRecoverable = (hasCandidateLock: boolean, stakingAccount: string) => {
  const { election: latestElection } = useLatestElection({ skip: !hasCandidateLock })

  if (!hasCandidateLock) return

  return (
    latestElection?.candidates?.find((candidate) => candidate.stakingAccount === stakingAccount)?.status !== 'ACTIVE'
  )
}

export const useIsVoteLockRecoverable = (hasVoteLock: boolean, stakingAccount: string) => {
  const { data: { castVotes: [vote] } = { castVotes: [] } } = useGetCouncilVotesQuery({
    variables: { where: { castBy_eq: stakingAccount, stakeLocked_eq: true } },
    skip: !hasVoteLock,
  })
  const { election: latestElection } = useLatestElection({ skip: !hasVoteLock })

  if (!hasVoteLock || !vote || !latestElection) return

  // Always recoverable when the vote was not cast during the latest election
  // Otherwise recoverable when the election is over and the voted for candidate was not elected
  const isInLatestElection = latestElection.cycleId === vote.electionRound.cycleId
  return !isInLatestElection || (latestElection.isFinished && vote.voteFor?.status !== CandidacyStatus.Elected)
}
