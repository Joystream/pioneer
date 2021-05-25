import React from 'react'
import { Link } from 'react-router-dom'

import { MemberModalLink } from '@/memberships/components/MemberModalLink'

import { LeaderSetActivity } from '../../types'

interface Props {
  activity: LeaderSetActivity
}

export const LeaderSetContent = ({ activity: { membership, groupName } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: membership.id } }}>{membership.handle}</MemberModalLink> has
    been appointed Leader of the <Link to={`working-groups/${groupName}`}>{groupName} Working Group</Link>.
  </>
)
