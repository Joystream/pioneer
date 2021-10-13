import React from 'react'
import { Route, Switch } from 'react-router'

import { Council } from '@/app/pages/Council/Council'
import { Election } from '@/app/pages/Council/Election'
import { PastCouncils } from '@/app/pages/Council/PastCouncils'
import { PastElections } from '@/app/pages/Council/PastElections'
import { PastVotes } from '@/app/pages/Council/PastVotes'

import { CouncilRoutes } from '../constants'

export const CouncilModule = () => {
  return (
    <Switch>
      <Route exact path={CouncilRoutes.council} component={Council} />
      <Route exact path={CouncilRoutes.currentElection} component={Election} />
      <Route exact path={CouncilRoutes.pastVotes} component={PastVotes} />
      <Route exact path={CouncilRoutes.pastCouncils} component={PastCouncils} />
      <Route exact path={CouncilRoutes.pastElections} component={PastElections} />
    </Switch>
  )
}
