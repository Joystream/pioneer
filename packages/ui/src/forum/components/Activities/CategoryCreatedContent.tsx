import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { ForumRoutes } from '@/forum/constant'
import { CategoryCreatedActivity } from '@/forum/types/ForumActivity'

export const CategoryCreatedContent: ActivityContentComponent<CategoryCreatedActivity> = ({ activity }) => {
  return activity.parentCategory ? (
    <>
      Category{' '}
      <ActivityRouterLink to={`${ForumRoutes.category}/${activity.category.id}`}>
        {activity.category.title}
      </ActivityRouterLink>{' '}
      has been created in{' '}
      <ActivityRouterLink to={`${ForumRoutes.category}/${activity.parentCategory.id}`}>
        {activity.parentCategory.title}
      </ActivityRouterLink>
      .
    </>
  ) : (
    <>
      Category{' '}
      <ActivityRouterLink to={`${ForumRoutes.category}/${activity.category.id}`}>
        {activity.category.title}
      </ActivityRouterLink>{' '}
      has been created.
    </>
  )
}
