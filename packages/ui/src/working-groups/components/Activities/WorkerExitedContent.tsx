import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerExitedActivity } from '@/working-groups/types'

export const WorkerExitedContent: ActivityContentComponent = ({ activity, isOwn }) => {
  const { member } = activity as WorkerExitedActivity

  if (isOwn) {
    return <>You left a role.</>
  }

  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink>
      left a role.
    </>
  )
}
