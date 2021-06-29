import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerStartedLeavingActivity } from '@/working-groups/types'

export const WorkerStartedLeavingContent: React.FC<ActivityContentProps> = ({ activity }) => {
  const { member } = activity as WorkerStartedLeavingActivity
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> left a role
      and is still in the unstaking period.
    </>
  )
}
