import React from 'react'
import { generatePath } from 'react-router'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ForumRoutes } from '@/forum/constant'
import { PostDeletedActivity } from '@/forum/types/ForumActivity'
import { MemberModalLink } from '@/memberships/components/MemberModalLink'

export const PostDeletedContent: ActivityContentComponent<PostDeletedActivity> = ({ activity }) =>
  activity.numberOfPosts > 1 ? (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: activity.actor.id } }}>
        {activity.actor.handle}
      </MemberModalLink>{' '}
      has deleted a post in the thread{' '}
      <ActivityRouterLink to={generatePath(ForumRoutes.thread, { id: activity.threadId })}>
        "{activity.threadTitle}"
      </ActivityRouterLink>
      .
    </>
  ) : (
    <>
      <MemberModalLink call={{ modal: 'Member', data: { id: activity.actor.id } }}>
        {activity.actor.handle}
      </MemberModalLink>{' '}
      has deleted {activity.numberOfPosts} posts.
    </>
  )
