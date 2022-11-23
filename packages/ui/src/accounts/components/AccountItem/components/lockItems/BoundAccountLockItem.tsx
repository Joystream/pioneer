import React from 'react'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { LockItem } from '../LockItem'
import { LockDetailsProps } from '../types'

export const BoundAccountLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { members } = useMyMemberships()

  const boundMembership = members.find((m) => m.boundAccounts.includes(String(address)))

  const boundLockEvent = boundMembership?.boundAccountsEvents?.find((event) => event.account === address)
  const block = boundLockEvent?.createdAtBlock

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={block}
      lockRecovery={{ unrecoverableLabel: 'Unrecoverable' }}
      memberInfo={boundMembership}
    />
  )
}
