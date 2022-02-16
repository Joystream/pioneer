import React from 'react'
import { generatePath } from 'react-router-dom'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalStatusUpdatedActivity } from '../../types/ProposalsActivities'

export const ProposalStatusUpdatedContent: ActivityContentComponent<ProposalStatusUpdatedActivity> = ({ activity }) => (
  <>
    "
    <ActivityRouterLink to={generatePath(ProposalsRoutes.preview, { id: activity.proposal.id })}>
      {activity.proposal.title}
    </ActivityRouterLink>
    " status updated to {activity.newStatus}
  </>
)
