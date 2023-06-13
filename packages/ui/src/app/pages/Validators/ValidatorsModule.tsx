import React from 'react'
import { Route, Switch } from 'react-router'

import { ValidatorsRoutes } from '@/validators/constants/routes'

import { ValidatorDashboard } from './ValidatorDashboard'
import { Validators } from './Validators'

export const ValidatorsModule = () => {
  return (
    <Switch>
      <Route exact path={ValidatorsRoutes.list} component={Validators} />
      <Route exact path={ValidatorsRoutes.validatordashboard} component={ValidatorDashboard} />
    </Switch>
  )
}
