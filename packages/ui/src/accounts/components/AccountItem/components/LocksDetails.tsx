import React, { useMemo } from 'react'

import { LockItem } from '@/accounts/components/AccountItem/components/LockItem'
import { isRecoverable } from '@/accounts/model/lockTypes'
import { Balances } from '@/accounts/types'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextMedium } from '@/common/components/typography'
import { Address } from '@/common/types'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { useMyCastVotes } from '@/council/hooks/useMyCastVotes'

interface LocksDetailsProps {
  balance: Balances | null
  address: Address
}

export const LocksDetails = ({ balance, address }: LocksDetailsProps) => {
  const { election } = useCurrentElection()
  const { votes } = useMyCastVotes()

  const isActiveCandidate = useMemo(
    () => election?.candidates.find((candidate) => candidate.stakingAccount === address)?.status === 'ACTIVE',
    [election, address]
  )

  const isVoteStakeLocked = useMemo(() => {
    const candidate = votes?.find((vote) => vote.castBy === address)?.voteFor
    // Disable recovering during election or if candidate won previous election
    // Enable recovering if new council is elected
    return !!(election || (candidate?.isCouncilMember && !election))
  }, [votes, address])

  if (!balance || !balance.locks.length) {
    return <TextMedium light>No locks found.</TextMedium>
  }

  const allLocks = balance.locks
  const recoverable = allLocks.filter(({ type }) => isRecoverable(type, isActiveCandidate, isVoteStakeLocked))
  const nonRecoverable = allLocks.filter(({ type }) => !isRecoverable(type, isActiveCandidate, isVoteStakeLocked))

  return (
    <>
      <RowGapBlock gap={8}>
        {nonRecoverable.length > 0 && <Label>Account Locks:</Label>}
        {nonRecoverable.map((lock, index) => (
          <LockItem key={index} lock={lock} />
        ))}

        {recoverable.length > 0 && <Label>Recoverable Locks:</Label>}
        {recoverable.map((lock, index) => (
          <LockItem key={index} lock={lock} isRecoverable address={address} />
        ))}
      </RowGapBlock>
    </>
  )
}
