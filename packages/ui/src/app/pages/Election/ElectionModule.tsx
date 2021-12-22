import React from 'react'
import { Route, Switch } from 'react-router'

import { ElectionRoutes } from '@/council/constants'

import { Election } from './Election'
import { PastElection } from './PastElections/PastElection'
import { PastElections } from './PastElections/PastElections'
import { PastVotes } from './PastVotes'

export const ElectionModule = () => {
  return (
    <Switch>
      <Route exact path={ElectionRoutes.currentElection} component={Election} />
      <Route exact path={ElectionRoutes.pastVotes} component={PastVotes} />
      <Route exact path={ElectionRoutes.pastElections} component={PastElections} />
      <Route exact path={ElectionRoutes.pastElection} component={PastElection} />
    </Switch>
  )
}
