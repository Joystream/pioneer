import React from 'react'

import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { AppliedOnOpeningActivity } from '../../types'

interface Props {
  activity: AppliedOnOpeningActivity
}

export const AppliedOnOpeningContent = ({ activity: { member, opening } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has applied
    on the opening{' '}
    <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>.
  </>
)
