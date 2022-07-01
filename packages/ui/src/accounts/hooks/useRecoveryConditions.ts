import { useMemo } from 'react'

import { Address } from '@/common/types'
import { useLatestElection } from '@/council/hooks/useLatestElection'
import { useMyCastVotes } from '@/council/hooks/useMyCastVotes'

import { useIsVoteStakeLocked } from './useIsVoteStakeLocked'

export const useRecoveryConditions = (address: Address) => {
  const { election } = useLatestElection()
  const { votes } = useMyCastVotes(election?.cycleId)

  const isActiveCandidate = useMemo(
    () => election?.candidates.find((candidate) => candidate.stakingAccount === address)?.status === 'ACTIVE',
    [election, address]
  )

  const candidate = useMemo(() => {
    return votes?.find((vote) => vote.castBy === address)?.voteFor
  }, [votes])

  const isVoteStakeLocked = !!useIsVoteStakeLocked(candidate, { isElectionFinished: election?.isFinished })

  return {
    isActiveCandidate,
    isVoteStakeLocked,
  }
}
