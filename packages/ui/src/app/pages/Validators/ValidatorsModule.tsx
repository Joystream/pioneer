import React from 'react'
import { Route, Switch } from 'react-router'

import { ValidatorsRoutes } from '@/validators/constants/routes'
import { ValidatorsInfo } from '@/validators/modals/ValidatorsInfo'

import { BondsList } from './BondsList'
import { ValidatorList } from './ValidatorList'

export const ValidatorsModule = () => {
  return (
    <>
      <Switch>
        <Route exact path={ValidatorsRoutes.list} component={ValidatorList} />
        <Route exact path={ValidatorsRoutes.bonds} component={BondsList} />
      </Switch>
      <ValidatorsInfo />
    </>
  )
}
