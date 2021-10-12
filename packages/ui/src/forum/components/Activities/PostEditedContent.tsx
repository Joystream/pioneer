import React from 'react'
import { generatePath } from 'react-router-dom'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ForumRoutes } from '@/forum/constant'
import { PostEditedActivity } from '@/forum/types/ForumActivity'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

export const PostEditedContent: ActivityContentComponent<PostEditedActivity> = ({ activity }) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: activity.author.id } }}>
      {activity.author.handle}
    </MemberModalLink>{' '}
    has edited a{' '}
    <ActivityRouterLink to={`${generatePath(ForumRoutes.thread, { id: activity.threadId })}?post=${activity.postId}`}>
      post
    </ActivityRouterLink>
    .
  </>
)
