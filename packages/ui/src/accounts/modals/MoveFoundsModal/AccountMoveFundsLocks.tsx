import React, { memo } from 'react'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { LockType } from '@/accounts/types'

import { AccountLocksWrapper, InlineLockIconWrapper } from './styles'

interface LockedAccount {
  address: string
  locks: LockType[]
}

interface AccountsRowProps {
  address: string
  addressesWithIncompatibleLocks: string[]
  accountsWithIncompatibleLocks: LockedAccount[]
}

export const AccountMoveFundsLocks = memo(
  ({ address, addressesWithIncompatibleLocks, accountsWithIncompatibleLocks }: AccountsRowProps) => {
    if (!addressesWithIncompatibleLocks.includes(address)) {
      return null
    }

    return (
      <AccountLocksWrapper>
        Locks:
        {accountsWithIncompatibleLocks
          .find((el) => el.address === address)
          ?.locks.map((lock) => (
            <InlineLockIconWrapper title={lock ?? 'Unknown lock'}>{lockIcon(lock)}</InlineLockIconWrapper>
          ))}
      </AccountLocksWrapper>
    )
  }
)
