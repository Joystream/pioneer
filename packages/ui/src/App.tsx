import React from 'react'
import { Membership } from './pages/Profile/Membership'
import { Profile } from './pages/Profile/Profile'
import { Redirect, Route, Switch } from 'react-router-dom'

export function App() {
  return (
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/memberships" component={Membership} />
      <Redirect exact from="/" to="/profile" />
    </Switch>
  )
}
