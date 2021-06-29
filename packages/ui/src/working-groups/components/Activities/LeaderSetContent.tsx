import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { LeaderSetActivity } from '@/working-groups/types'

export const LeaderSetContent: ActivityContentComponent<LeaderSetActivity> = ({ activity }) => {
  const { member, groupName } = activity
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has been
      appointed Leader of the{' '}
      <ActivityRouterLink to={`/working-groups/${groupName}`}>{groupName} Working Group</ActivityRouterLink>.
    </>
  )
}
