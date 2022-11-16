import React from 'react'

import { LockItemWrapper } from '@/accounts/components/AccountItem/components/LockItemWrapper'
import { VestingLockListItem } from '@/accounts/components/AccountItem/components/VestingLockItem/VestingLockItem'
import { useGroupLocks } from '@/accounts/hooks/useGroupLocks'
import { Balances } from '@/accounts/types'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextMedium } from '@/common/components/typography'
import { Address } from '@/common/types'

interface LocksDetailsProps {
  balance: Balances | null
  address: Address
}

export const LocksDetails = ({ balance, address }: LocksDetailsProps) => {
  const { recoverable, unRecoverable } = useGroupLocks(address, balance?.locks ?? [])

  if (!balance || !balance.locks.length) {
    return <TextMedium light>No locks found.</TextMedium>
  }

  return (
    <>
      <RowGapBlock gap={8}>
        {(balance?.vesting.length ?? -1) > 0 && <Label>Vesting Locks:</Label>}
        {balance?.vesting.map((vesting, index) => (
          <VestingLockListItem {...vesting} key={`vesting-lock-${index}`} />
        ))}

        {unRecoverable.length > 0 && <Label>Account Locks:</Label>}
        {unRecoverable?.map((lock, index) => (
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
