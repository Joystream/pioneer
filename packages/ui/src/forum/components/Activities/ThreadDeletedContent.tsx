import React from 'react'
import { generatePath } from 'react-router-dom'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ForumRoutes } from '@/forum/constant'
import { ThreadDeletedActivity } from '@/forum/types/ForumActivity'

export const ThreadDeletedContent: ActivityContentComponent<ThreadDeletedActivity> = ({ activity }) => (
  <>
    Thread "
    <ActivityRouterLink to={generatePath(ForumRoutes.thread, { id: activity.thread.id })}>
      {activity.thread.title}
    </ActivityRouterLink>
    " has been deleted.
  </>
)
