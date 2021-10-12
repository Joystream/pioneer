import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { NotFound } from '@/app/pages/NotFound'
import { ConnectionStatus } from '@/common/components/ConnectionStatus'
import { Page } from '@/common/components/page/Page'
import { NotificationsHolder } from '@/common/components/page/SideNotification'
import { CouncilModule } from '@/council/components/Council'
import { CouncilRoutes } from '@/council/constants'
import { ForumRoutes } from '@/forum/constant'
import { ProposalsModule } from '@/proposals/components/ProposalsModule'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { WorkingGroupsRoutes } from '@/working-groups/constants/routes'
import { WorkingGroupsModule } from '@/working-groups/WorkingGroupsModule'

import { ExtensionWarning } from './components/ExtensionWarning'
import { SideBar } from './components/SideBar'
import { MembersRoutes, ProfileRoutes, SettingsRoutes } from './constants/routes'
import { GlobalModals } from './GlobalModals'
import { Forum } from './pages/Forum'
import { Members } from './pages/Members/Members'
import { MyAccounts } from './pages/Profile/MyAccounts'
import { MyMemberships } from './pages/Profile/MyMemberships'
import { Settings } from './pages/Settings/Settings'
import { Providers } from './Providers'

export const App = () => (
  <Providers>
    <Page>
      <SideBar />
      <Switch>
        <Route path={WorkingGroupsRoutes.groups} component={WorkingGroupsModule} />
        <Route path={ProposalsRoutes.home} component={ProposalsModule} />
        <Route path={CouncilRoutes.council} component={CouncilModule} />
        <Route path={ForumRoutes.forum} component={Forum} />
        <Route exact path={ProfileRoutes.profile} component={MyAccounts} />
        <Route exact path={ProfileRoutes.memberships} component={MyMemberships} />
        <Route exact path={MembersRoutes.members} component={Members} />
        <Route exact path={SettingsRoutes.settings} component={Settings} />
        <Route exact path="/404" component={NotFound} />
        <Redirect exact from="/" to={ProfileRoutes.profile} />
        <Redirect exact from={ProposalsRoutes.home} to={ProposalsRoutes.current} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Page>
    <GlobalModals />
    <NotificationsHolder>
      <ConnectionStatus />
      <ExtensionWarning />
    </NotificationsHolder>
  </Providers>
)
