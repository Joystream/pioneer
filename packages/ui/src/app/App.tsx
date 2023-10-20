import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import '@/services/i18n'

import { ImageReportNotification } from '@/app/components/ImageReportNotification'
import { OnBoardingOverlay } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { CouncilModule } from '@/app/pages/Council/CouncilModule'
import { NotFound } from '@/app/pages/NotFound'
import { GlobalStyle } from '@/app/providers/GlobalStyle'
import { BountyRoutes } from '@/bounty/constants'
import { ConnectionStatus } from '@/common/components/ConnectionStatus'
import { MaintenanceScreen } from '@/common/components/page/MaintenanceScreen/MaintenanceScreen'
import { MobileView } from '@/common/components/page/MobileView/MobileView'
import { Page, Screen } from '@/common/components/page/Page'
import { NotificationsHolder } from '@/common/components/page/SideNotification'
import { TransactionStatus } from '@/common/components/TransactionStatus/TransactionStatus'
import { parseEnv } from '@/common/utils/env'
import { CouncilRoutes, ElectionRoutes } from '@/council/constants'
import { ForumRoutes } from '@/forum/constant'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { WorkingGroupsRoutes } from '@/working-groups/constants/routes'

import { ExtensionNotification } from './components/ExtensionWarning'
import { SideBar } from './components/SideBar'
import { MembersRoutes, ProfileRoutes, SettingsRoutes, TermsRoutes } from './constants/routes'
import { GlobalModals } from './GlobalModals'
import { BountyModule } from './pages/Bounty/BountyModule'
import { ElectionModule } from './pages/Election/ElectionModule'
import { ForumModule } from './pages/Forum'
import { Members } from './pages/Members/Members'
import { MyAccounts } from './pages/Profile/MyAccounts'
import { MyMemberships } from './pages/Profile/MyMemberships'
import { ProposalsModule } from './pages/Proposals/ProposalsModule'
import { Settings } from './pages/Settings/Settings'
import { PrivacyPolicy, TermsOfService } from './pages/Terms'
import { WorkingGroupsModule } from './pages/WorkingGroups/WorkingGroupsModule'
import { Providers } from './Providers'

export const App = () => {
  if (parseEnv(process.env.REACT_APP_IS_UNDER_MAINTENANCE)) {
    return <MaintenanceScreen />
  }

  return (
    <Providers>
      <Page>
        <SideBar />
        <Screen>
          <OnBoardingOverlay />
          <Switch>
            {/*// Uncomment to see whole overview section*/}
            {/*<Route path={OverviewRoutes.overview} component={OverviewModule} />*/}
            <Route path={WorkingGroupsRoutes.groups} component={WorkingGroupsModule} />
            <Route path={ProposalsRoutes.home} component={ProposalsModule} />
            <Route path={CouncilRoutes.council} component={CouncilModule} />
            <Route path={ElectionRoutes.currentElection} component={ElectionModule} />
            <Route path={ForumRoutes.forum} component={ForumModule} />
            <Route path={BountyRoutes.bounties} component={BountyModule} />
            <Route exact path={ProfileRoutes.profile} component={MyAccounts} />
            <Route exact path={ProfileRoutes.memberships} component={MyMemberships} />
            <Route exact path={MembersRoutes.members} component={Members} />
            <Route exact path={SettingsRoutes.settings} component={Settings} />
            <Route exact path={TermsRoutes.privacyPolicy} component={PrivacyPolicy} />
            <Route exact path={TermsRoutes.termsOfService} component={TermsOfService} />
            <Route exact path="/404" component={NotFound} />
            <Redirect exact from="/" to={WorkingGroupsRoutes.groups} />
            <Redirect exact from={ProposalsRoutes.home} to={ProposalsRoutes.current} />
            <Redirect from="*" to="/404" />
          </Switch>
        </Screen>
      </Page>
      <GlobalModals />
      <NotificationsHolder>
        <TransactionStatus />
        <ConnectionStatus />
        <ExtensionNotification />
        <ImageReportNotification />
      </NotificationsHolder>
    </Providers>
  )
}

export const Mobile = () => (
  <>
    <GlobalStyle />
    <MobileView />
  </>
)
