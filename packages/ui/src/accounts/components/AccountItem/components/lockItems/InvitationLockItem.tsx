import React from 'react'

import { asBlock } from '@/common/types'
import { useGetMemberInvitedEventsQuery } from '@/memberships/queries'

import { LockItem } from '../LockItem'
import { LockDetailsProps } from '../types'

const tooltipLabel =
  'Invitation lock can be spent on transaction fees and staking for proposals, voting and working groups applications. JOY tokens subject to this lock cannot be transferred to any other accounts. This lock is unrecoverable. NB: Transaction fees will first be taken from your transferable balance if it is positive.'

export const InvitationLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { data } = useGetMemberInvitedEventsQuery({ variables: { lockAccount: address } })
  const eventData = data?.memberInvitedEvents[0]
  const createdInEvent = eventData && asBlock(eventData)
  const recoveryInfo = { unrecoverableLabel: 'Unrecoverable', tooltipLabel }

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      lockRecovery={recoveryInfo}
    />
  )
}
