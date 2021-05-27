import React from 'react'

import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerStartedLeavingActivity } from '@/working-groups/types'

interface Props {
  activity: WorkerStartedLeavingActivity
}

export const WorkerStartedLeavingContent = ({ activity: { member } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> left a role
    and is still in the unstaking period.
  </>
)
