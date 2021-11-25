import React from 'react'
import { Route, Switch } from 'react-router'

import { CouncilRoutes } from '@/council/constants'

import { Council } from './Council'
import { PastCouncil } from './PastCouncils/PastCouncil'
import { PastCouncils } from './PastCouncils/PastCouncils'

export const CouncilModule = () => {
  return (
    <Switch>
      <Route exact path={CouncilRoutes.council} component={Council} />
      <Route exact path={CouncilRoutes.pastCouncils} component={PastCouncils} />
      <Route exact path={CouncilRoutes.pastCouncil} component={PastCouncil} />
    </Switch>
  )
}
