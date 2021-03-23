import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectionStatus } from './components/ConnectionStatus'
import { makeServer } from './mocks/server'
import { useMockMembers } from './mocks/useMockMembers'
import { MyAccounts } from './pages/Profile/MyAccounts'
import { MyMemberships } from './pages/Profile/MyMemberships'

makeServer()

export function App() {
  useMockMembers()

  return (
    <>
      <Switch>
        <Route exact path="/profile" component={MyAccounts} />
        <Route exact path="/profile/memberships" component={MyMemberships} />
        <Redirect exact from="/" to="/profile" />
      </Switch>
      <ConnectionStatus />
    </>
  )
}
