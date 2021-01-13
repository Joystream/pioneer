import React from 'react'
import { Profile } from './pages/Profile/Profile'
import { Redirect, Route, Switch } from 'react-router-dom'

export function App() {
  return (
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Redirect exact from="/" to="/profile" />
    </Switch>
  )
}
