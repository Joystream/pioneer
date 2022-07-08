import { useMemo } from 'react'

import { Address } from '@/common/types'
import { useLatestElection } from '@/council/hooks/useLatestElection'
import { useMyCastVotes } from '@/council/hooks/useMyCastVotes'
import { useWorkerUnstakingPeriodEnd } from '@/working-groups/hooks/useWorkerUnstakingPeriodEnd'
import { useGetWorkerIdsQuery, useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

import { RecoveryConditions } from '../model/lockTypes'

import { useIsVoteStakeLocked } from './useIsVoteStakeLocked'

export const useRecoveryConditions = (address: Address): RecoveryConditions => {
  const { election } = useLatestElection()
  const { votes } = useMyCastVotes(election?.cycleId)
  const { data: applicationData } = useGetWorkingGroupApplicationsQuery({
    variables: { where: { stakingAccount_eq: address } },
  })
  const applicationStatus = applicationData?.workingGroupApplications[0]?.status?.__typename
  const { data: workerData } = useGetWorkerIdsQuery({ variables: { where: { stakeAccount_eq: address } } })
  const workerId = workerData?.workers[0]?.id
  const { unstakingPeriodEnd } = useWorkerUnstakingPeriodEnd(workerId)

  const isActiveCandidate = useMemo(
    () => election?.candidates.find((candidate) => candidate.stakingAccount === address)?.status === 'ACTIVE',
    [election, address]
  )

  const candidate = useMemo(() => {
    return votes?.find((vote) => vote.castBy === address)?.voteFor
  }, [votes])

  const isVoteStakeLocked = !!useIsVoteStakeLocked(candidate, { isElectionFinished: election?.isFinished })

  const isWorkerStakeLocked = useMemo(() => {
    if (applicationStatus === 'ApplicationStatusPending') {
      return true
    }

    if (applicationStatus === 'ApplicationStatusAccepted') {
      if (unstakingPeriodEnd) {
        return Date.parse(unstakingPeriodEnd) > Date.now()
      }
      return true
    }

    return false
  }, [workerId, unstakingPeriodEnd])

  return {
    isActiveCandidate,
    isVoteStakeLocked,
    isWorkerStakeLocked,
  }
}
