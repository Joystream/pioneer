import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { CouncilRoutes } from '@/council/constants'
import { VotingPeriodStartedActivity } from '@/council/types/CouncilActivities'

export const VotingPeriodStartedContent: ActivityContentComponent<VotingPeriodStartedActivity> = () => (
  <ActivityRouterLink to={`${CouncilRoutes.currentElection}`}>
    Voting period on council election has started.{' '}
  </ActivityRouterLink>
)
