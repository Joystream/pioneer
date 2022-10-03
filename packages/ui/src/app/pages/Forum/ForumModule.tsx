import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Forum } from '@/app/pages/Forum/Forum'
import { ForumArchived } from '@/app/pages/Forum/ForumArchived'
import { ForumCategory } from '@/app/pages/Forum/ForumCategory'
import { ForumThread } from '@/app/pages/Forum/ForumThread'
import { ForumWatchlist } from '@/app/pages/Forum/ForumWatchlist'
import { ForumRoutes } from '@/forum/constant'

import { ForumMyThreads } from './ForumMyThreads'

export const ForumModule = () => {
  return (
    <Switch>
      <Route path={ForumRoutes.forum} exact component={Forum} />
      <Route path={ForumRoutes.myThreads} exact component={ForumMyThreads} />
      <Route path={ForumRoutes.watchlist} exact component={ForumWatchlist} />
      <Route path={ForumRoutes.archived} exact component={ForumArchived} />
      <Route path={ForumRoutes.category} exact component={ForumCategory} />
      <Route path={ForumRoutes.thread} exact component={ForumThread} />
      <Redirect from="/forum/*" to={ForumRoutes.forum} />
    </Switch>
  )
}
