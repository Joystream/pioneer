import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalVotedActivity } from '../../types/ProposalsActivities'

export const ProposalVotedContent: ActivityContentComponent<ProposalVotedActivity> = ({ activity }) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: activity.voter.id } }}>
      {activity.voter.handle}
    </MemberModalLink>{' '}
    voted on the proposal "
    <ActivityRouterLink to={`${ProposalsRoutes.preview}/${activity.proposal.id}`}>
      {activity.proposal.title}
    </ActivityRouterLink>
    ".
  </>
)
