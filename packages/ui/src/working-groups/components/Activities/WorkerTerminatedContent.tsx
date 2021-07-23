import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerTerminatedActivity } from '@/working-groups/types'

export const WorkerTerminatedContent: ActivityContentComponent<WorkerTerminatedActivity> = ({ activity, isOwn }) => {
  const { member, groupName, eventType } = activity
  const isLead = eventType === 'TerminatedLeaderEvent'
  if (isLead) {
    return isOwn ? (
      <>You have been terminated by the Council.</>
    ) : (
      <>
        <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has been
        terminated by the Council.
      </>
    )
  }
  return isOwn ? (
    <>You have been terminated by {groupName} Working Group Lead.</>
  ) : (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has been
      terminated by {groupName} Working Group Lead.
    </>
  )
}
