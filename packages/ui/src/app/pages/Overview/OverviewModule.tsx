import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import { Overview } from '@/app/pages/Overview/Overview'
import { OverviewRoutes } from '@/overview/constants/routes'

export const OverviewModule = () => {
  return (
    <Switch>
      <Route exact path={OverviewRoutes.overview} component={Overview} />
      <Redirect from="/overview/*" to={OverviewRoutes.overview} />
    </Switch>
  )
}
