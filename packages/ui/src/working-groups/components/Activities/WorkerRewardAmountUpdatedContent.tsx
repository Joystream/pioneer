import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'
import { WorkerRewardAmountUpdatedActivity } from '@/working-groups/types'

export const WorkerRewardAmountUpdatedContent: ActivityContentComponent<WorkerRewardAmountUpdatedActivity> = ({
  activity,
}) => {
  const { newAmount } = activity
  return (
    <>
      Your reward amount has been updated to <TokenValue value={newAmount} />.
    </>
  )
}
