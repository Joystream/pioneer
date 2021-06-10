import React from 'react'

import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { ApplicationWithdrawnActivity } from '../../types'

interface Props {
  activity: ApplicationWithdrawnActivity
}

export const ApplicationWithdrawnContent = ({ activity: { member, opening } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has withdrawn
    application from "
    <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>" opening.
  </>
)
