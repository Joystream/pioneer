import React from 'react'
import { Link } from 'react-router-dom'

import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { ApplicationWithdrawnActivity } from '../../types'

interface Props {
  activity: ApplicationWithdrawnActivity
}

export const ApplicationWithdrawnContent = ({ activity: { membership, opening } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: membership.id } }}>{membership.handle}</MemberModalLink> has
    withdrawn application from "<Link to={`/working-groups/openings/${opening.id}`}>{opening.title}</Link>" opening.
  </>
)
