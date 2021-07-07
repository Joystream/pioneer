import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerTerminatedActivity } from '@/working-groups/types'

const getGoverningBody = (isLeader: boolean, groupName: string) =>
  isLeader ? 'the Council' : `${groupName} Working Group Lead`

export const WorkerTerminatedContent: ActivityContentComponent<WorkerTerminatedActivity> = ({ activity, isOwn }) => {
  const { member, groupName, eventType } = activity
  const isLeader = eventType === 'TerminatedLeaderEvent'
  return isOwn ? (
    <>You have been terminated by {getGoverningBody(isLeader, groupName)}.</>
  ) : (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> has been
      terminated by {getGoverningBody(isLeader, groupName)}.
    </>
  )
}
