import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { ApplicationWithdrawnActivity } from '../../types'

export const ApplicationWithdrawnContent: React.FC<ActivityContentProps> = ({ activity }) => {
  const { member, opening } = activity as ApplicationWithdrawnActivity
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has
      withdrawn application from "
      <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>" opening.
    </>
  )
}
