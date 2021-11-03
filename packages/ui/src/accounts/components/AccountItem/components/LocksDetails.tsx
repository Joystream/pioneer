import React from 'react'

import { LockItem } from '@/accounts/components/AccountItem/components/LockItem'
import { isRecoverable } from '@/accounts/model/lockTypes'
import { Balances } from '@/accounts/types'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextMedium } from '@/common/components/typography'

interface LocksDetailsProps {
  balance: Balances | null
}

export const LocksDetails = ({ balance }: LocksDetailsProps) => {
  if (!balance || !balance.locks.length) {
    return <TextMedium light>No locks found.</TextMedium>
  }

  const allLocks = balance.locks
  const recoverable = allLocks.filter(({ type }) => isRecoverable(type))
  const nonRecoverable = allLocks.filter(({ type }) => !isRecoverable(type))

  return (
    <>
      <RowGapBlock gap={8}>
        {nonRecoverable.length > 0 && <Label>Account Locks:</Label>}
        {nonRecoverable.map((lock, index) => (
          <LockItem key={index} lock={lock} />
        ))}

        {recoverable.length > 0 && <Label>Recoverable Locks:</Label>}
        {recoverable.map((lock, index) => (
          <LockItem key={index} lock={lock} isRecoverable />
        ))}
      </RowGapBlock>
    </>
  )
}
