import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { WorkerStartedLeavingActivity } from '@/working-groups/types'

export const WorkerStartedLeavingContent: ActivityContentComponent = ({ activity, isOwn }) => {
  const { member } = activity as WorkerStartedLeavingActivity
  return (
    <>
      {isOwn ? (
        <>You </>
      ) : (
        <MemberModalLink call={{ modal: 'Member', data: { id: member.id } }}>{member.handle} </MemberModalLink>
      )}
      left a role and {isOwn ? 'are' : 'is'} still in the unstaking period.
    </>
  )
}
