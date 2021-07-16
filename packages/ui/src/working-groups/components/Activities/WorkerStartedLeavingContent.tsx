import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerStartedLeavingActivity } from '@/working-groups/types'

export const WorkerStartedLeavingContent: ActivityContentComponent<WorkerStartedLeavingActivity> = ({
  activity,
  isOwn,
}) => {
  const { member } = activity

  if (activity.workerStatus === 'WorkerStatusLeaving') {
    return isOwn ? (
      <>You started leaving a role and you are still in the unstaking period.</>
    ) : (
      <>
        <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle} </MemberModalLink>
        started leaving a role and is still in the unstaking period.
      </>
    )
  }

  return isOwn ? (
    <>You started leaving a role.</>
  ) : (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle} </MemberModalLink>
      started leaving a role.
    </>
  )
}
