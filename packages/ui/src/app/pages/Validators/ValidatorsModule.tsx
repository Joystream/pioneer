import React from 'react'
import { Route, Switch } from 'react-router'

import { ValidatorsRoutes } from '@/validators/constants/routes'

import { Bags } from './Bags'
import { NominatorDashboard } from './NominatorDashboard'
import { ValidatorDashboard } from './ValidatorDashboard'
import { ValidatorList } from './ValidatorList'

export const ValidatorsModule = () => {
  return (
    <Switch>
      <Route exact path={ValidatorsRoutes.list} component={ValidatorList} />
      <Route exact path={ValidatorsRoutes.stakes} component={ValidatorDashboard} />
      <Route exact path={ValidatorsRoutes.validatordashboard} component={ValidatorDashboard} />
      <Route exact path={ValidatorsRoutes.bags} component={Bags} />
      <Route exact path={ValidatorsRoutes.nominator} component={NominatorDashboard} />
    </Switch>
  )
}
