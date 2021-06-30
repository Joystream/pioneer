import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { AppliedOnOpeningActivity } from '../../types'

export const AppliedOnOpeningContent: ActivityContentComponent<AppliedOnOpeningActivity> = ({ activity, isOwn }) => {
  const { member, opening } = activity
  return isOwn ? (
    <>
      You have applied on the opening{' '}
      <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>.
    </>
  ) : (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has applied
      on the opening{' '}
      <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>.
    </>
  )
}
