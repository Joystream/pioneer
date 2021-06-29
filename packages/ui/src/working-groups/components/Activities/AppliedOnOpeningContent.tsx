import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { AppliedOnOpeningActivity } from '../../types'

export const AppliedOnOpeningContent: React.FC<ActivityContentProps> = ({ activity }) => {
  const { member, opening } = activity as AppliedOnOpeningActivity
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has applied
      on the opening{' '}
      <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>.
    </>
  )
}
