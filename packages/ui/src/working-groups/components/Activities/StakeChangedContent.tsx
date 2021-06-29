import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeChangedActivity } from '@/working-groups/types'

export const StakeChangedContent: React.FC<ActivityContentProps> = ({ activity }) => {
  const { member, amount, eventType } = activity as StakeChangedActivity
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink>'s stake has
      been {eventType === 'StakeDecreased' ? 'reduced' : 'increased'} by <TokenValue value={amount} />
    </>
  )
}
