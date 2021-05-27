import React from 'react'

import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerExitedActivity } from '@/working-groups/types'

interface Props {
  activity: WorkerExitedActivity
}

export const WorkerExitedContent = ({ activity: { member } }: Props) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle}</MemberModalLink> left a role.
  </>
)
