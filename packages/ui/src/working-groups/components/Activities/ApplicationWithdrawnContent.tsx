import React from 'react'

import { RouterLink } from '@/common/components/RouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { ApplicationWithdrawnActivity } from '../../types'

interface Props {
  activity: ApplicationWithdrawnActivity
}

export const ApplicationWithdrawnContent = ({ activity: { membership, opening } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: membership.id } }}>{membership.handle}</MemberModalLink> has
    withdrawn application from "<RouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</RouterLink>"
    opening.
  </>
)
