import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'
import { CouncilorRewardUpdatedActivity } from '@/council/types/CouncilActivities'

export const CouncilorRewardUpdatedContent: ActivityContentComponent<CouncilorRewardUpdatedActivity> = ({
  activity,
}) => {
  const { newReward } = activity
  return (
    <>
      Councilor reward amount has been updated to <TokenValue value={newReward} />.
    </>
  )
}
