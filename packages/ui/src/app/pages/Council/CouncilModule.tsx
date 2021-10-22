import React from 'react'
import { Route, Switch } from 'react-router'

import { CouncilRoutes } from '@/council/constants'

import { Council } from './Council'
import { Election } from './Election'
import { PastCouncils } from './PastCouncils'
import { PastElection } from './PastElections/PastElection'
import { PastElections } from './PastElections/PastElections'
import { PastVotes } from './PastVotes'

export const CouncilModule = () => {
  return (
    <Switch>
      <Route exact path={CouncilRoutes.council} component={Council} />
      <Route exact path={CouncilRoutes.currentElection} component={Election} />
      <Route exact path={CouncilRoutes.pastVotes} component={PastVotes} />
      <Route exact path={CouncilRoutes.pastCouncils} component={PastCouncils} />
      <Route exact path={CouncilRoutes.pastElections} component={PastElections} />
      <Route exact path={CouncilRoutes.pastElection} component={PastElection} />
    </Switch>
  )
}
