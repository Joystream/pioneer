import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeChangedActivity } from '@/working-groups/types'

export const StakeChangedContent: ActivityContentComponent = ({ activity, isOwn }) => {
  const { member, amount, eventType } = activity as StakeChangedActivity
  return (
    <>
      {isOwn ? (
        <>Your </>
      ) : (
        <>
          <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink>'s{' '}
        </>
      )}
      stake has been {eventType === 'StakeDecreased' ? 'reduced' : 'increased'} by <TokenValue value={amount} />
    </>
  )
}
