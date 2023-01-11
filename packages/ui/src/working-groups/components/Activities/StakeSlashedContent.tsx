import React, { useState } from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ButtonLink } from '@/common/components/buttons/Buttons'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeSlashedActivity } from '@/working-groups/types'

import { StakeChangedModal } from './ActivitiesModals/StakeChanged/StakeChangedModal'

export const StakeSlashedContent: ActivityContentComponent<StakeSlashedActivity> = ({ activity, isOwn }) => {
  const { eventType, member, groupName, id } = activity
  const [isStakeSlashedModalOpen, setStakeSlashedModalOpen] = useState(false)

  if (isOwn) {
    return (
      <>
        Your stake has been slashed by the {groupName} lead.{' '}
        <ButtonLink size="small" inline onClick={() => setStakeSlashedModalOpen(!isStakeSlashedModalOpen)}>
          Read more
        </ButtonLink>
        {isStakeSlashedModalOpen && (
          <StakeChangedModal
            onClose={() => setStakeSlashedModalOpen(!isStakeSlashedModalOpen)}
            eventType={eventType}
            id={id}
          />
        )}
      </>
    )
  }

  return (
    <>
      The stake of{' '}
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> was slashed
      by the {groupName} lead.{' '}
      <ButtonLink size="small" inline onClick={() => setStakeSlashedModalOpen(!isStakeSlashedModalOpen)}>
        Read more
      </ButtonLink>
      {isStakeSlashedModalOpen && (
        <StakeChangedModal
          onClose={() => setStakeSlashedModalOpen(!isStakeSlashedModalOpen)}
          eventType={eventType}
          id={id}
        />
      )}
    </>
  )
}
