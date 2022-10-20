import { randomAsHex } from '@polkadot/util-crypto'
import { useEffect, useMemo, useState } from 'react'

import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useCandidate } from '@/council/hooks/useCandidate'

import { calculateCommitment } from '../model/calculateCommitment'

export interface VotingAttempt {
  salt: string
  accountId: string
  optionId: string
}

export const useCommitment = (accountId: string | undefined, candidateId: string) => {
  const { candidate } = useCandidate(candidateId)

  const vote = useMemo(() => {
    if (!accountId || !candidate) return

    // See https://polkadot.js.org/docs/util-crypto/examples/encrypt-decrypt
    const salt = randomAsHex()

    const optionId = candidate.member.id
    const cycleId = candidate.cycleId

    return {
      key: `votes:${cycleId}`,
      value: { salt, accountId, optionId },
      commitment: calculateCommitment(accountId, optionId, salt, cycleId),
    }
  }, [accountId, candidate?.id])

  const [isVoteStored, setIsVoteStored] = useState(false)
  const [, updateVotingAttempts] = useLocalStorage<VotingAttempt[]>(vote?.key)
  useEffect(() => {
    if (!vote) return

    updateVotingAttempts((attempts = []) => [...attempts, vote.value])
    setIsVoteStored(true)
  }, [vote?.key, vote?.value])

  return { commitment: vote?.commitment, isVoteStored }
}
