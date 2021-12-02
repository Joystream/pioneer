import React from 'react'
import { generatePath } from 'react-router'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ForumRoutes } from '@/forum/constant'
import { PostModeratedActivity } from '@/forum/types/ForumActivity'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

export const PostModeratedContent: ActivityContentComponent<PostModeratedActivity> = ({ activity }) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: activity.actor.id } }}>
      {activity.actor.handle}
    </MemberModalLink>{' '}
    has moderated a{' '}
    <ActivityRouterLink to={`${generatePath(ForumRoutes.thread, { id: activity.threadId })}?post=${activity.postId}`}>
      post
    </ActivityRouterLink>
    .
  </>
)
