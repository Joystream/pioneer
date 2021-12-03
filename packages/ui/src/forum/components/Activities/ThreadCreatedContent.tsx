import React from 'react'
import { generatePath } from 'react-router-dom'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ForumRoutes } from '@/forum/constant'
import { ThreadCreatedActivity } from '@/forum/types/ForumActivity'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

export const ThreadCreatedContent: ActivityContentComponent<ThreadCreatedActivity> = ({ activity }) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: activity.author.id } }}>
      {activity.author.handle}
    </MemberModalLink>{' '}
    has created a thread "
    <ActivityRouterLink to={generatePath(ForumRoutes.thread, { id: activity.thread.id })}>
      {activity.thread.title}
    </ActivityRouterLink>
    " in "
    <ActivityRouterLink to={generatePath(ForumRoutes.category, { id: activity.category.id })}>
      {activity.category.title}
    </ActivityRouterLink>
    " category.
  </>
)
