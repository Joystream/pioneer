import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { WaitForAPI } from '@/app/components/WaitForAPI'
import { ConnectionStatus } from '@/common/components/ConnectionStatus'
import { Page } from '@/common/components/page/Page'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { ExtensionWarning } from './components/ExtensionWarning'
import { SideBar } from './components/SideBar'
import { GlobalModals } from './GlobalModals'
import { Forum } from './pages/Forum'
import { Members } from './pages/Members/Members'
import { MyAccounts } from './pages/Profile/MyAccounts'
import { MyMemberships } from './pages/Profile/MyMemberships'
import { PastProposals } from './pages/Proposals/PastProposals'
import { ProposalPreview } from './pages/Proposals/ProposalPreview'
import { Proposals } from './pages/Proposals/Proposals'
import { Settings } from './pages/Settings/Settings'
import { MyApplications } from './pages/WorkingGroups/MyApplications'
import { MyRole } from './pages/WorkingGroups/MyRoles/MyRole'
import { MyRoles } from './pages/WorkingGroups/MyRoles/MyRoles'
import { UpcomingOpening } from './pages/WorkingGroups/UpcomingOpening'
import { WorkingGroup } from './pages/WorkingGroups/WorkingGroup'
import { WorkingGroups } from './pages/WorkingGroups/WorkingGroups'
import { WorkingGroupOpening } from './pages/WorkingGroups/WorkingGroupsOpening'
import { WorkingGroupsOpenings } from './pages/WorkingGroups/WorkingGroupsOpenings'
import { Providers } from './Providers'

export const App = () => (
  <Providers>
    <Page>
      <SideBar />
      <WaitForAPI>
        <Switch>
          <Route exact path="/profile" component={MyAccounts} />
          <Route exact path="/profile/memberships" component={MyMemberships} />
          <Route exact path="/working-groups" component={WorkingGroups} />
          <Route exact path="/working-groups/openings" component={WorkingGroupsOpenings} />
          <Route exact path="/working-groups/my-applications" component={MyApplications} />
          <Route exact path="/working-groups/my-roles" component={MyRoles} />
          <Route exact path="/working-groups/my-roles/:id" component={MyRole} />
          <Route exact path="/working-groups/:name" component={WorkingGroup} />
          <Route exact path="/working-groups/openings/:id" component={WorkingGroupOpening} />
          <Route exact path="/working-groups/upcoming-openings/:id" component={UpcomingOpening} />
          <Route exact path={ProposalsRoutes.current} component={Proposals} />
          <Route exact path={ProposalsRoutes.past} component={PastProposals} />
          <Route exact path={ProposalsRoutes.myproposals} />
          <Route exact path={`${ProposalsRoutes.preview}/:id/vote/:voteId`} component={ProposalPreview} />
          <Route exact path={`${ProposalsRoutes.preview}/:id/post/:postId`} component={ProposalPreview} />
          <Route exact path={`${ProposalsRoutes.preview}/:id`} component={ProposalPreview} />
          <Route exact path="/members" component={Members} />
          <Route exact path="/members/:id" component={Members} />
          <Route exact path="/settings" component={Settings} />
          <Route path="/forum" component={Forum} />
          <Redirect exact from="/" to="/profile" />
        </Switch>
      </WaitForAPI>
    </Page>
    <GlobalModals />
    <ConnectionStatus />
    <ExtensionWarning />
  </Providers>
)
