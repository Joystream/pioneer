import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ConnectionStatus } from '../common/components/ConnectionStatus'
import { Page } from '../common/components/page/Page'

import { ExtensionWarning } from './components/ExtensionWarning'
import { SideBar } from './components/SideBar'
import { GlobalModals } from './GlobalModals'
import { Members } from './pages/Members/Members'
import { MyAccounts } from './pages/Profile/MyAccounts'
import { MyMemberships } from './pages/Profile/MyMemberships'
import { MyApplications } from './pages/WorkingGroups/MyApplications'
import { MyRoles } from './pages/WorkingGroups/MyRoles'
import { WorkingGroup } from './pages/WorkingGroups/WorkingGroup'
import { WorkingGroups } from './pages/WorkingGroups/WorkingGroups'
import { WorkingGroupsOpenings } from './pages/WorkingGroups/WorkingGroupsOpenings'
import { Providers } from './Providers'

export const App = () => (
  <Providers>
    <Page>
      <SideBar />
      <Switch>
        <Route exact path="/profile" component={MyAccounts} />
        <Route exact path="/profile/memberships" component={MyMemberships} />
        <Route exact path="/working-groups" component={WorkingGroupsOpenings} />
        <Route exact path="/working-groups/working-groups" component={WorkingGroups} />
        <Route exact path="/working-groups/my-applications" component={MyApplications} />
        <Route exact path="/working-groups/my-roles" component={MyRoles} />
        <Route exact path="/working-groups/grouppreview/:id" component={WorkingGroup} />
        <Route exact path="/members" component={Members} />
        <Redirect exact from="/" to="/profile" />
      </Switch>
    </Page>
    <ConnectionStatus />
    <ExtensionWarning />
    <GlobalModals />
  </Providers>
)
