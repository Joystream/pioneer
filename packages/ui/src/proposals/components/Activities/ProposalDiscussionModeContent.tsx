import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalDiscussionModeChangedActivity } from '../../types/ProposalsActivities'

export const ProposalDiscussionModeContent: ActivityContentComponent<ProposalDiscussionModeChangedActivity> = ({
  activity,
}) => (
  <>
    Proposal "
    <ActivityRouterLink to={`${ProposalsRoutes.preview}/${activity.proposal.id}`}>
      {activity.proposal.title}
    </ActivityRouterLink>
    " discussion mode changed to {activity.newMode}.
  </>
)
