import { WorkingGroupApplicationOrderByInput } from '@/common/api/queries'
import { useLatestElection } from '@/council/hooks/useLatestElection'
import { usePastElection } from '@/council/hooks/usePastElection'
import { useGetCouncilVotesQuery } from '@/council/queries'
import { useApplications } from '@/working-groups/hooks/useApplications'
import { useWorkerUnstakingPeriodEnd } from '@/working-groups/hooks/useWorkerUnstakingPeriodEnd'
import { useGetWorkerIdsQuery } from '@/working-groups/queries'

export const useIsWGLockRecoverable = (hasWGLock: boolean, stakingAccount: string) => {
  const { applications } = useApplications({
    stakingAccount,
    limit: 1,
    orderBy: [WorkingGroupApplicationOrderByInput.CreatedAtDesc],
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
  const { election: latestElection } = useLatestElection({ skip: !hasVoteLock })
  const { data: possibleVotes } = useGetCouncilVotesQuery({
    variables: { where: { castBy_eq: stakingAccount } },
    skip: !hasVoteLock,
  })
  const vote = possibleVotes?.castVotes.find((vote) => vote.stakeLocked)
  const { election: voteElection } = usePastElection(String(vote?.electionRound.cycleId ?? 0))

  const isInLatestElection = latestElection?.cycleId === voteElection?.cycleId
  return !(isInLatestElection || vote?.voteFor?.member.isCouncilMember)
}
