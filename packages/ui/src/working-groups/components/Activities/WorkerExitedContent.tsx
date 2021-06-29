import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerExitedActivity } from '@/working-groups/types'

export const WorkerExitedContent: React.FC<ActivityContentProps> = ({ activity }) => {
  const { member } = activity as WorkerExitedActivity
  return (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> left a
      role.
    </>
  )
}
