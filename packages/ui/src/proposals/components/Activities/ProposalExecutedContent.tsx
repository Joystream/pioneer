import React from 'react'
import { generatePath } from 'react-router-dom'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalExecutedActivity } from '../../types/ProposalsActivities'

export const ProposalExecutedContent: ActivityContentComponent<ProposalExecutedActivity> = ({ activity }) =>
  activity.executedSuccessfully ? (
    <>
      Proposal "
      <ActivityRouterLink to={generatePath(ProposalsRoutes.preview, { id: activity.proposal.id })}>
        {activity.proposal.title}
      </ActivityRouterLink>
      " has been executed.
    </>
  ) : (
    <>
      Proposal "
      <ActivityRouterLink to={generatePath(ProposalsRoutes.preview, { id: activity.proposal.id })}>
        {activity.proposal.title}
      </ActivityRouterLink>
      " execution failed.
    </>
  )
