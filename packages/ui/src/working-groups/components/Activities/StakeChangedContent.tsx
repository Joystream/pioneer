import React from 'react'

import { TokenValue } from '@/common/components/typography'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeChangedActivity } from '@/working-groups/types'

interface Props {
  activity: StakeChangedActivity
}
export const StakeChangedContent = ({ activity: { member, amount, eventType } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink>'s stake has
    been {eventType === 'StakeDecreased' ? 'reduced' : 'increased'} by <TokenValue value={amount} />
  </>
)
