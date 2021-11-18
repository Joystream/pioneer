import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { CouncilRoutes } from '@/council/constants'
import { RevealingStageStartedActivity } from '@/council/types/CouncilActivities'

export const RevealingStageStartedContent: ActivityContentComponent<RevealingStageStartedActivity> = () => (
  <ActivityRouterLink to={`${CouncilRoutes.currentElection}`}>
    Revealing stage on council election has started
  </ActivityRouterLink>
)
