import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ConnectionStatus } from '../common/components/ConnectionStatus'

import { ExtensionWarning } from './components/ExtensionWarning'
import { GlobalModals } from './GlobalModals'
import { MyAccounts } from './pages/Profile/MyAccounts'
import { MyMemberships } from './pages/Profile/MyMemberships'
import { WorkingGroup } from './pages/WorkingGroups/WorkingGroup'
import { WorkingGroups } from './pages/WorkingGroups/WorkingGroups'
import { Providers } from './Providers'

export const App = () => (
  <Providers>
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
  </Providers>
)
