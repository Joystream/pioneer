import React from 'react'
import { Profile } from './pages/Profile/Profile'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <Redirect exact from="/" to="/profile" />
      </Switch>
    </BrowserRouter>
  )
}
