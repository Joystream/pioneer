import React from 'react'

import { asBlock } from '@/common/types'
import { useGetMemberInvitedEventsQuery } from '@/memberships/queries'

import { LockItem } from '../LockItem'
import { LockDetailsProps } from '../types'

export const InvitationLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { data } = useGetMemberInvitedEventsQuery({ variables: { lockAccount: address } })
  const eventData = data?.memberInvitedEvents[0]
  const createdInEvent = eventData && asBlock(eventData)

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      lockRecovery={{ unrecoverableLabel: 'Unrecoverable' }}
    />
  )
}
