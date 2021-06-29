import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeSlashedActivity } from '@/working-groups/types'

export const StakeSlashedContent: ActivityContentComponent = ({ activity, isOwn }) => {
  const { member, groupName } = activity as StakeSlashedActivity
  return (
    <>
      {isOwn ? (
        <>You have </>
      ) : (
        <>
          <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has{' '}
        </>
      )}
      been slashed by the {groupName} Working Group Lead.
    </>
  )
}
