import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeChangedActivity } from '@/working-groups/types'

export const StakeChangedContent: ActivityContentComponent<StakeChangedActivity> = ({ activity, isOwn }) => {
  const { member, amount, eventType } = activity

  if (isOwn) {
    return (
      <>
        Your stake has been {eventType === 'StakeDecreasedEvent' ? 'reduced' : 'increased'} by{' '}
        <TokenValue value={amount} />
      </>
    )
  }
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink>'s stake has
      been {eventType === 'StakeDecreasedEvent' ? 'reduced' : 'increased'} by <TokenValue value={amount} />
    </>
  )
}
