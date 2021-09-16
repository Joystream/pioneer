import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalCreatedActivity } from '../ProposalsActivities'

export const ProposalCreatedContent: ActivityContentComponent<ProposalCreatedActivity> = ({ activity }) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: activity.creator.id } }}>
      {activity.creator.handle}
    </MemberModalLink>{' '}
    has submitted a proposal "
    <ActivityRouterLink to={`${ProposalsRoutes.preview}/${activity.proposal.id}`}>
      {activity.proposal.title}
    </ActivityRouterLink>
    ".
  </>
)
