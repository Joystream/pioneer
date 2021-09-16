import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalStatusUpdatedActivity } from '../ProposalsActivities'

export const ProposalStatusUpdatedContent: ActivityContentComponent<ProposalStatusUpdatedActivity> = ({ activity }) => (
  <>
    "
    <ActivityRouterLink to={`${ProposalsRoutes.preview}/${activity.proposal.id}`}>
      {activity.proposal.title}
    </ActivityRouterLink>
    " status updated to {activity.newStatus}
  </>
)
