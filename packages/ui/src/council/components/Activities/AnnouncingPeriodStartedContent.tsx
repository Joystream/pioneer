import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ElectionRoutes } from '@/council/constants'
import { AnnouncingPeriodStartedActivity } from '@/council/types/CouncilActivities'

export const AnnouncingPeriodStartedContent: ActivityContentComponent<AnnouncingPeriodStartedActivity> = () => (
  <ActivityRouterLink to={`${ElectionRoutes.currentElection}`}>Announcing period has been started </ActivityRouterLink>
)
