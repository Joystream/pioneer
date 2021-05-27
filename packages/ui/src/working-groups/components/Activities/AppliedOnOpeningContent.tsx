import React from 'react'

import { RouterLink } from '@/common/components/RouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { AppliedOnOpeningActivity } from '../../types'

interface Props {
  activity: AppliedOnOpeningActivity
}

export const AppliedOnOpeningContent = ({ activity: { member, opening } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has applied
    on the opening <RouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</RouterLink>.
  </>
)
