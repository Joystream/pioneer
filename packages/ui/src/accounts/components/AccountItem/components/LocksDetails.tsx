import React from 'react'

import { LockItemWrapper } from '@/accounts/components/AccountItem/components/LockItemWrapper'
import { VestingLockListItem } from '@/accounts/components/AccountItem/components/VestingLockItem/VestingLockItem'
import { useRecoveryConditions } from '@/accounts/hooks/useRecoveryConditions'
import { Vesting } from '@/accounts/hooks/useVesting'
import { isRecoverable } from '@/accounts/model/lockTypes'
import { Balances } from '@/accounts/types'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextMedium } from '@/common/components/typography'
import { Address } from '@/common/types'

interface LocksDetailsProps {
  balance: Balances | null
  address: Address
  vesting: Vesting | null
}

export const LocksDetails = ({ balance, address, vesting }: LocksDetailsProps) => {
  const { isActiveCandidate, isVoteStakeLocked, isWorkerStakeLocked } = useRecoveryConditions(address)

  if (!balance && !vesting) {
    return <TextMedium light>No locks found.</TextMedium>
  }

  const allLocks = balance?.locks
  const recoverable =
    allLocks?.filter(({ type }) =>
      isRecoverable(type, { isActiveCandidate, isVoteStakeLocked, isWorkerStakeLocked })
    ) ?? []
  const nonRecoverable =
    allLocks?.filter(
      ({ type }) => !isRecoverable(type, { isActiveCandidate, isVoteStakeLocked, isWorkerStakeLocked })
    ) ?? []

  return (
    <>
      <RowGapBlock gap={8}>
        {(vesting?.vesting.length ?? -1) > 0 && <Label>Vesting Locks:</Label>}
        {vesting?.vesting.map((vesting, index) => (
          <VestingLockListItem {...vesting} key={`vesting-lock-${index}`} />
        ))}

        {nonRecoverable.length > 0 && <Label>Account Locks:</Label>}
        {nonRecoverable?.map((lock, index) => (
          <LockItemWrapper key={index} lock={lock} address={address} />
        ))}

        {recoverable.length > 0 && <Label>Recoverable Locks:</Label>}
        {recoverable?.map((lock, index) => (
          <LockItemWrapper key={index} lock={lock} address={address} isRecoverable />
        ))}
      </RowGapBlock>
    </>
  )
}
