import React from 'react'
import { MyMemberships } from './pages/Profile/MyMemberships'
import { MyAccounts } from './pages/Profile/MyAccounts'
import { Redirect, Route, Switch } from 'react-router-dom'

import './mocks/hydra'

export function App() {
  return (
    <Switch>
      <Route exact path="/profile" component={MyAccounts} />
      <Route exact path="/profile/memberships" component={MyMemberships} />
      <Redirect exact from="/" to="/profile" />
    </Switch>
  )
}
