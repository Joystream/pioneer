import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ForumCategories } from '@/app/pages/Forum/ForumCategories'
import { ForumCategory } from '@/app/pages/Forum/ForumCategory'
import { ForumThread } from '@/app/pages/Forum/ForumThread'
import { ForumRoutes } from '@/forum/constant'

export const Forum = () => {
  return (
    <Switch>
      <Redirect from={ForumRoutes.root} to={ForumRoutes.forum} exact />
      <Route path={ForumRoutes.forum} exact component={ForumCategories} />
      <Route path={`${ForumRoutes.category}/:id`} exact component={ForumCategory} />
      <Route path="/forum/thread/:id" exact component={ForumThread} />
    </Switch>
  )
}
