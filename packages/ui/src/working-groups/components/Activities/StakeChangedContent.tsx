import React, { useState } from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ButtonLink } from '@/common/components/buttons'
import { TokenValue } from '@/common/components/typography'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeChangedActivity } from '@/working-groups/types'

import { StakeChangedModal } from './ActivitiesModals/StakeChanged/StakeChangedModal'

export const StakeChangedContent: ActivityContentComponent<StakeChangedActivity> = ({ activity, isOwn }) => {
  const { amount, eventType, id, member } = activity
  const [isStakeChangedModalOpen, setStakeChangedModalOpen] = useState(false)
  if (isOwn) {
    return (
      <>
        Your stake has been {eventType === 'StakeDecreasedEvent' ? 'reduced' : 'increased'} by{' '}
        <TokenValue value={amount} />.{' '}
        <ButtonLink size="small" inline onClick={() => setStakeChangedModalOpen(!isStakeChangedModalOpen)}>
          Read more
        </ButtonLink>
        {isStakeChangedModalOpen && (
          <StakeChangedModal
            onClose={() => setStakeChangedModalOpen(!isStakeChangedModalOpen)}
            amount={amount}
            eventType={eventType}
            id={id}
          />
        )}
      </>
    )
  }
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink>'s stake has
      been {eventType === 'StakeDecreasedEvent' ? 'reduced' : 'increased'} by <TokenValue value={amount} />.{' '}
      <ButtonLink size="small" inline onClick={() => setStakeChangedModalOpen(!isStakeChangedModalOpen)}>
        Read more
      </ButtonLink>
      {isStakeChangedModalOpen && (
        <StakeChangedModal
          onClose={() => setStakeChangedModalOpen(!isStakeChangedModalOpen)}
          amount={amount}
          eventType={eventType}
          id={id}
        />
      )}
    </>
  )
}
