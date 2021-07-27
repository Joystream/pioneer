import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ForumCategories } from '@/app/pages/Forum/ForumCategories'

export const Forum = () => {
  return (
    <Switch>
      <Route path="/forum" exact component={ForumCategories} />
    </Switch>
  )
}
