import React from 'react'
import { generatePath } from 'react-router-dom'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalCancelledActivity } from '../../types/ProposalsActivities'

export const ProposalCancelledContent: ActivityContentComponent<ProposalCancelledActivity> = ({ activity }) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: activity.creator.id } }}>
      {activity.creator.handle}
    </MemberModalLink>{' '}
    has cancelled the proposal "
    <ActivityRouterLink to={generatePath(ProposalsRoutes.preview, { id: activity.proposal.id })}>
      {activity.proposal.title}
    </ActivityRouterLink>
    ".
  </>
)
