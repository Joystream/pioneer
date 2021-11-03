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

export interface MyCastVote extends VotingAttempt {
  voteId?: string
  isRevealed: boolean
}

export const useCommitment = (accountId: string, candidateId: string) => {
  const { candidate } = useCandidate(candidateId)

  const vote = useMemo(() => {
    if (!candidate) return

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
  const [votingAttempts, setVotingAttempts] = useLocalStorage<VotingAttempt[]>(vote?.key)
  useEffect(() => {
    if (!vote) return

    setVotingAttempts([...(votingAttempts ?? []), vote.value])
    setIsVoteStored(true)
  }, [vote?.key, vote?.value])

  return { commitment: vote?.commitment, isVoteStored }
}
