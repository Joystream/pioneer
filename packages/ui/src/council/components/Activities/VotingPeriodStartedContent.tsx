import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ElectionRoutes } from '@/council/constants'
import { VotingPeriodStartedActivity } from '@/council/types/CouncilActivities'

export const VotingPeriodStartedContent: ActivityContentComponent<VotingPeriodStartedActivity> = () => (
  <ActivityRouterLink to={`${ElectionRoutes.currentElection}`}>
    Voting period on council election has started.{' '}
  </ActivityRouterLink>
)
