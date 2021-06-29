import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { StakeSlashedActivity } from '@/working-groups/types'

export const StakeSlashedContent: React.FC<ActivityContentProps> = ({ activity }) => {
  const { member, groupName } = activity as StakeSlashedActivity
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has been
      slashed by the {groupName} Working Group Lead.
    </>
  )
}
