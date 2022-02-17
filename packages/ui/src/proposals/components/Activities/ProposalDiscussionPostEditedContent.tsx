import React from 'react'
import { generatePath } from 'react-router-dom'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ProposalDiscussionPostEditedActivity } from '../../types/ProposalsActivities'

export const ProposalDiscussionPostEditedContent: ActivityContentComponent<ProposalDiscussionPostEditedActivity> = ({
  activity,
}) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: activity.author.id } }}>
      {activity.author.handle}
    </MemberModalLink>{' '}
    edited their post in the discussion thread for the proposal "
    <ActivityRouterLink
      to={`${generatePath(ProposalsRoutes.preview, { id: activity.proposal.id })}?post=${activity.postId}`}
    >
      {activity.proposal.title}
    </ActivityRouterLink>
    ".
  </>
)
