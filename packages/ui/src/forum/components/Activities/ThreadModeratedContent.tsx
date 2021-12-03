import React from 'react'
import { generatePath } from 'react-router-dom'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ForumRoutes } from '@/forum/constant'
import { ThreadModeratedActivity } from '@/forum/types/ForumActivity'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

export const ThreadModeratedContent: ActivityContentComponent<ThreadModeratedActivity> = ({ activity }) => (
  <>
    <MemberModalLink call={{ modal: 'Member', data: { id: activity.actor.id } }}>
      {activity.actor.handle}
    </MemberModalLink>{' '}
    has moderated a thread "
    <ActivityRouterLink to={generatePath(ForumRoutes.thread, { id: activity.thread.id })}>
      {activity.thread.title}
    </ActivityRouterLink>
    ".
  </>
)
