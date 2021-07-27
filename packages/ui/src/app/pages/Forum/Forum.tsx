import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ForumCategories } from '@/app/pages/Forum/ForumCategories'
import { ForumCategory } from '@/app/pages/Forum/ForumCategory'

export const Forum = () => {
  return (
    <Switch>
      <Route path="/forum" exact component={ForumCategories} />
      <Route path="/forum/category/:id" exact component={ForumCategory} />
    </Switch>
  )
}
