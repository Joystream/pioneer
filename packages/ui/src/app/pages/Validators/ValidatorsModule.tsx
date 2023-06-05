import React from 'react'
import { Route, Switch } from 'react-router'

import { ValidatorsRoutes } from '@/validators/constants/routes'
import { Validators } from './Validators'
import { ValidatorDashboard } from './ValidatorDashboard'

export const ValidatorsModule = () => {
  return (
    <Switch>
      <Route exact path={ValidatorsRoutes.list} component={Validators} />
      <Route exact path={ValidatorsRoutes.validatordashboard} component={ValidatorDashboard} />
    </Switch>
  )
}
