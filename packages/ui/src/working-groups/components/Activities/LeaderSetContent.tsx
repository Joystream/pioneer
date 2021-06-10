import React from 'react'

import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { LeaderSetActivity } from '../../types'

interface Props {
  activity: LeaderSetActivity
}

export const LeaderSetContent = ({ activity: { member, groupName } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has been
    appointed Leader of the{' '}
    <ActivityRouterLink to={`/working-groups/${groupName}`}>{groupName} Working Group</ActivityRouterLink>.
  </>
)
