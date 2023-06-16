import React from 'react'
import { Route, Switch } from 'react-router'

import { ValidatorsRoutes } from '@/validators/constants/routes'

import { ValidatorDashboard } from './ValidatorDashboard'
import { ValidatorList } from './ValidatorList'
import { ValidatorsInfo } from '@/validators/modals/ValidatorsInfo'

export const ValidatorsModule = () => {
  return (
    <>
      <Switch>
        <Route exact path={ValidatorsRoutes.list} component={ValidatorList} />
        <Route exact path={ValidatorsRoutes.validatordashboard} component={ValidatorDashboard} />
      </Switch>
      <ValidatorsInfo />
    </>
  )
}
