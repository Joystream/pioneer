import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { NotFound } from '@/app/pages/NotFound'
import { ConnectionStatus } from '@/common/components/ConnectionStatus'
import { Page } from '@/common/components/page/Page'
import { NotificationsHolder } from '@/common/components/page/SideNotification'
import { CouncilRoutes } from '@/council/constants'
import { ForumRoutes } from '@/forum/constant'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { WorkingGroupsRoutes } from '@/working-groups/constants/routes'

import { ExtensionWarning } from './components/ExtensionWarning'
import { SideBar } from './components/SideBar'
import { GlobalModals } from './GlobalModals'
import { Council } from './pages/Council/Council'
import { Election } from './pages/Council/Election'
import { PastCouncils } from './pages/Council/PastCouncils'
import { PastElections } from './pages/Council/PastElections'
import { PastVotes } from './pages/Council/PastVotes'
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
      <Switch>
        <Route exact path="/profile" component={MyAccounts} />
        <Route exact path="/profile/memberships" component={MyMemberships} />
        <Route exact path={WorkingGroupsRoutes.groups} component={WorkingGroups} />
        <Route exact path={`${WorkingGroupsRoutes.upcomingOpenings}/:id`} component={UpcomingOpening} />
        <Route exact path={`${WorkingGroupsRoutes.openings}/:id`} component={WorkingGroupOpening} />
        <Route exact path={WorkingGroupsRoutes.openings} component={WorkingGroupsOpenings} />
        <Route exact path={WorkingGroupsRoutes.myApplications} component={MyApplications} />
        <Route exact path={WorkingGroupsRoutes.myRoles} component={MyRoles} />
        <Route exact path={`${WorkingGroupsRoutes.myRoles}/:id`} component={MyRole} />
        <Route exact path={`${WorkingGroupsRoutes.groups}/:name`} component={WorkingGroup} />
        <Route exact path={ProposalsRoutes.current} component={Proposals} />
        <Route exact path={ProposalsRoutes.past} component={PastProposals} />
        <Route exact path={ProposalsRoutes.myproposals} />
        <Route exact path={`${ProposalsRoutes.preview}/:id/vote/:voteId`} component={ProposalPreview} />
        <Route exact path={`${ProposalsRoutes.preview}/:id/post/:postId`} component={ProposalPreview} />
        <Route exact path={`${ProposalsRoutes.preview}/:id`} component={ProposalPreview} />
        <Route exact path={CouncilRoutes.council} component={Council} />
        <Route exact path={CouncilRoutes.currentElection} component={Election} />
        <Route exact path={CouncilRoutes.pastVotes} component={PastVotes} />
        <Route exact path={CouncilRoutes.pastCouncils} component={PastCouncils} />
        <Route exact path={CouncilRoutes.pastElections} component={PastElections} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/members/:id" component={Members} />
        <Route exact path="/settings" component={Settings} />
        <Route path={ForumRoutes.forum} component={Forum} />
        <Route exact path="/404" component={NotFound} />
        <Redirect exact from="/" to="/profile" />
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
