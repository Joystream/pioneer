import React from 'react'

import { asBlock } from '@/common/types'
import { useGetMemberInvitedEventsQuery } from '@/memberships/queries'

import { LockItem } from '../LockItem'
import { LockItemProps } from '../types'

export const InvitationLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const { data } = useGetMemberInvitedEventsQuery({ variables: { lockAccount: address } })
  const eventData = data?.memberInvitedEvents[0]
  const createdInEvent = eventData && asBlock(eventData)

  return <LockItem lock={lock} address={address} isRecoverable={isRecoverable} createdInEvent={createdInEvent} />
}
