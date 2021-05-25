import React from 'react'

import { RouterLink } from '@/common/components/RouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { LeaderSetActivity } from '../../types'

interface Props {
  activity: LeaderSetActivity
}

export const LeaderSetContent = ({ activity: { membership, groupName } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: membership.id } }}>{membership.handle}</MemberModalLink> has
    been appointed Leader of the <RouterLink to={`working-groups/${groupName}`}>{groupName} Working Group</RouterLink>.
  </>
)
