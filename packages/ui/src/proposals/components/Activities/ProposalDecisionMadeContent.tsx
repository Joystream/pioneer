import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalDecisionMadeActivity } from '../../types/ProposalsActivities'

export const ProposalDecisionMadeContent: ActivityContentComponent<ProposalDecisionMadeActivity> = ({ activity }) => (
  <>
    Proposal "
    <ActivityRouterLink to={`${ProposalsRoutes.preview}/${activity.proposal.id}`}>
      {activity.proposal.title}
    </ActivityRouterLink>
    " decision made.
  </>
)
