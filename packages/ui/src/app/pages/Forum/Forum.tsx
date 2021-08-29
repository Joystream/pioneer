import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ForumArchived } from '@/app/pages/Forum/ForumArchived'
import { ForumCategories } from '@/app/pages/Forum/ForumCategories'
import { ForumCategory } from '@/app/pages/Forum/ForumCategory'
import { ForumThread } from '@/app/pages/Forum/ForumThread'
import { ForumRoutes } from '@/forum/constant'

import { LatestThreads } from './LatestThreads'

export const Forum = () => {
  return (
    <Switch>
      <Route path={ForumRoutes.forum} exact component={ForumCategories} />
      <Route path={`${ForumRoutes.category}/:id/:type?`} exact component={ForumCategory} />
      <Route path={ForumRoutes.archived} exact component={ForumArchived} />
      <Route path={`${ForumRoutes.thread}/:id`} exact component={ForumThread} />
      <Route path={ForumRoutes.latestThreads} exact component={LatestThreads} />
      <Redirect from="/forum/*" to={ForumRoutes.forum} />
    </Switch>
  )
}
