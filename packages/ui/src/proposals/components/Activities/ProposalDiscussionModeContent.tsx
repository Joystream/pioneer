import React from 'react'
import { generatePath } from 'react-router-dom'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalDiscussionModeChangedActivity } from '../../types/ProposalsActivities'

export const ProposalDiscussionModeContent: ActivityContentComponent<ProposalDiscussionModeChangedActivity> = ({
  activity,
}) => (
  <>
    Proposal "
    <ActivityRouterLink to={generatePath(ProposalsRoutes.preview, { id: activity.proposal.id })}>
      {activity.proposal.title}
    </ActivityRouterLink>
    " discussion mode changed to {activity.newMode}.
  </>
)
