import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { ApplicationWithdrawnActivity } from '../../types'

export const ApplicationWithdrawnContent: ActivityContentComponent<ApplicationWithdrawnActivity> = ({
  activity,
  isOwn,
}) => {
  const { member, opening } = activity
  return isOwn ? (
    <>
      You have withdrawn application from "
      <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>" opening.
    </>
  ) : (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has{' '}
      withdrawn application from "
      <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>" opening.
    </>
  )
}
