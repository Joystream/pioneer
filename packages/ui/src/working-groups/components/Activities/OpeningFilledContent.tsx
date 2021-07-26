import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { OpeningFilledActivity } from '@/working-groups/types'

export const OpeningFilledContent: ActivityContentComponent<OpeningFilledActivity> = ({ activity }) => {
  const { opening, hiredMembers } = activity
  return opening.type == 'LEAD' ? (
    <>
      Opening <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink> for
      a Lead has been filled.
      {hiredMembers.map((member) => (
        <span key={member.handle}>
          <br />
          <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has
          been hired.
        </span>
      ))}
    </>
  ) : (
    <>
      Opening <ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink> has
      been filled.
      {hiredMembers.map((member) => (
        <span key={member.handle}>
          <br />
          <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has
          been hired.
        </span>
      ))}
    </>
  )
}
