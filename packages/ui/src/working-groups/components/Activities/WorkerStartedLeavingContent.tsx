import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerStartedLeavingActivity } from '@/working-groups/types'

export const WorkerStartedLeavingContent: ActivityContentComponent<WorkerStartedLeavingActivity> = ({
  activity,
  isOwn,
}) => {
  const { member } = activity

  if (isOwn) {
    return <>You left role and you are still in the unstaking period.</>
  }

  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle} </MemberModalLink>
      left a role and is still in the unstaking period.
    </>
  )
}
