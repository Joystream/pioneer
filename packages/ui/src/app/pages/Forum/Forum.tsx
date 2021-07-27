import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ForumCategories } from '@/app/pages/Forum/ForumCategories'
import { ForumCategory } from '@/app/pages/Forum/ForumCategory'
import { ForumThread } from '@/app/pages/Forum/ForumThread'

export const Forum = () => {
  return (
    <Switch>
      <Route path="/forum" exact component={ForumCategories} />
      <Route path="/forum/category/:id" exact component={ForumCategory} />
      <Route path="/forum/thread/:id" exact component={ForumThread} />
    </Switch>
  )
}
