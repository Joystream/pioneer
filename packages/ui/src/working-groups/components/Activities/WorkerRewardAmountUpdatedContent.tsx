import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'
import { WorkerRewardAmountUpdatedActivity } from '@/working-groups/types'

export const WorkerRewardAmountUpdatedContent: ActivityContentComponent<WorkerRewardAmountUpdatedActivity> = ({
  activity,
}) => {
  const { newAmount, member, openingTitle } = activity
  return (
    <>
      {member.handle}'s reward for {openingTitle} changed to <TokenValue value={newAmount} /> joy per block.
    </>
  )
}
