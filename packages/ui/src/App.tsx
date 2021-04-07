import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { GlobalModals } from './app/GlobalModals'
import { MyAccounts } from './app/pages/Profile/MyAccounts'
import { MyMemberships } from './app/pages/Profile/MyMemberships'
import { WorkingGroup } from './app/pages/WorkingGroups/WorkingGroup'
import { WorkingGroups } from './app/pages/WorkingGroups/WorkingGroups'
import { ConnectionStatus } from './common/components/ConnectionStatus'
import { useMockMembers } from './mocks/useMockMembers'
import { useSudoBudget } from './mocks/useSudoBudget'
import { ExtensionWarning } from './components/ExtensionWarning'

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
