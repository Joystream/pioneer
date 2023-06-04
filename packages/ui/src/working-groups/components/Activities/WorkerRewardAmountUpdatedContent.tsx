import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'
import { GroupIdToGroupParam } from '@/working-groups/constants'
import { WorkerRewardAmountUpdatedActivity } from '@/working-groups/types'

export const WorkerRewardAmountUpdatedContent: ActivityContentComponent<WorkerRewardAmountUpdatedActivity> = ({
  activity,
}) => {
  const { newAmount, member, openingTitle, groupId } = activity
  const group = GroupIdToGroupParam[groupId]
  return (
    <>
      {member?.handle}'s reward for {openingTitle} in {group} changed to <TokenValue value={newAmount} /> per block.
    </>
  )
}
