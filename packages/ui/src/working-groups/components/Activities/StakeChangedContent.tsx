import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ButtonLink } from '@/common/components/buttons'
import { TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeChangedActivity } from '@/working-groups/types'

import { StakeChangedModalCall } from './ActivitiesModals/StakeChanged/types'

export const StakeChangedContent: ActivityContentComponent<StakeChangedActivity> = ({ activity, isOwn }) => {
  const { member, amount, eventType } = activity
  const { showModal } = useModal()

  if (isOwn) {
    return (
      <>
        Your stake has been {eventType === 'StakeDecreasedEvent' ? 'reduced' : 'increased'} by{' '}
        <TokenValue value={amount} />.{' '}
        <ButtonLink size="small" inline onClick={() => showModal<StakeChangedModalCall>({ modal: 'StakeChanged' })}>
          Read more
        </ButtonLink>
      </>
    )
  }
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink>'s stake has
      been {eventType === 'StakeDecreasedEvent' ? 'reduced' : 'increased'} by <TokenValue value={amount} />.{' '}
      <ButtonLink size="small" inline onClick={() => showModal<StakeChangedModalCall>({ modal: 'StakeChanged' })}>
        Read more
      </ButtonLink>
    </>
  )
}
