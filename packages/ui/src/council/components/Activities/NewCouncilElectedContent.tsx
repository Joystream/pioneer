import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { CouncilRoutes } from '@/council/constants'
import { NewCouncilElectedActivity } from '@/council/types/CouncilActivities'

export const NewCouncilElectedContent: ActivityContentComponent<NewCouncilElectedActivity> = ({ activity }) => (
  <ActivityRouterLink to={CouncilRoutes.council}>
    {activity.electedMembersCount} councilors have been elected.
  </ActivityRouterLink>
)
