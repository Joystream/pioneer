import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { GlobalModals } from './app/GlobalModals'
import { ConnectionStatus } from './components/ConnectionStatus'
import { useMockMembers } from './mocks/useMockMembers'
import { useSudoBudget } from './mocks/useSudoBudget'
import { WorkingGroups } from './pages/WorkingGroups/WorkingGroups'
import { MyAccounts } from './pages/Profile/MyAccounts'
import { MyMemberships } from './pages/Profile/MyMemberships'
import { GroupStorage } from './pages/WorkingGroups/GroupStorage'

export function App() {
  useMockMembers()
  useSudoBudget()

  return (
    <>
      <Switch>
        <Route exact path="/profile" component={MyAccounts} />
        <Route exact path="/profile/memberships" component={MyMemberships} />
        <Route exact path="/groups" component={WorkingGroups} />
        <Route exact path="/groups/grouppreview" component={GroupStorage} />
        <Redirect exact from="/" to="/profile" />
      </Switch>
      <ConnectionStatus />
      <GlobalModals />
    </>
  )
}
