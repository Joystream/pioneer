import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { GlobalModals } from './app/GlobalModals'
import { ConnectionStatus } from './components/ConnectionStatus'
import { ExtensionWarning } from './components/ExtensionWarning'
import { useMockMembers } from './mocks/useMockMembers'
import { useSudoBudget } from './mocks/useSudoBudget'
import { MyAccounts } from './pages/Profile/MyAccounts'
import { MyMemberships } from './pages/Profile/MyMemberships'
import { WorkingGroup } from './pages/WorkingGroups/WorkingGroup'
import { WorkingGroups } from './pages/WorkingGroups/WorkingGroups'

export function App() {
  useMockMembers()
  useSudoBudget()

  return (
    <>
      <Switch>
        <Route exact path="/profile" component={MyAccounts} />
        <Route exact path="/profile/memberships" component={MyMemberships} />
        <Route exact path="/groups" component={WorkingGroups} />
        <Route exact path="/groups/grouppreview" component={WorkingGroup} />
        <Redirect exact from="/" to="/profile" />
      </Switch>
      <ConnectionStatus />
      <ExtensionWarning />
      <GlobalModals />
    </>
  )
}
