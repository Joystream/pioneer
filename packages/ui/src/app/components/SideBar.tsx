import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { SidebarConnections } from '@/app/components/SidebarConnections'
import { MembersRoutes, ProfileRoutes, SettingsRoutes } from '@/app/constants/routes'
import { BountyRoutes } from '@/bounty/constants'
import { Arrow } from '@/common/components/icons'
import { LinkSymbol, LinkSymbolStyle, PolkadotSymbol } from '@/common/components/icons/symbols'
import { SubscanSymbol } from '@/common/components/icons/symbols/SubscanSymbol'
import { AppsIcon } from '@/common/components/page/Sidebar/LinksIcons/AppsIcon'
import { BandwidthIcon } from '@/common/components/page/Sidebar/LinksIcons/BandwidthIcon'
import { BountyIcon } from '@/common/components/page/Sidebar/LinksIcons/BountyIcon'
import { ConstitutionIcon } from '@/common/components/page/Sidebar/LinksIcons/ConstitutionIcon'
import { ContentIcon } from '@/common/components/page/Sidebar/LinksIcons/ContentIcon'
import { CouncilIcon } from '@/common/components/page/Sidebar/LinksIcons/CouncilIcon'
import { ElectionIcon } from '@/common/components/page/Sidebar/LinksIcons/ElectionIcon'
import { FinancialsIcon } from '@/common/components/page/Sidebar/LinksIcons/FinancialsIcon'
import { ForumIcon } from '@/common/components/page/Sidebar/LinksIcons/ForumIcon'
import { MembersIcon } from '@/common/components/page/Sidebar/LinksIcons/MembersIcon'
import { MyProfileIcon } from '@/common/components/page/Sidebar/LinksIcons/MyProfileIcon'
import { ProposalsIcon } from '@/common/components/page/Sidebar/LinksIcons/ProposalsIcon'
import { SettingsIcon } from '@/common/components/page/Sidebar/LinksIcons/SettingsIcon'
import { StorageIcon } from '@/common/components/page/Sidebar/LinksIcons/StorageIcon'
import { ValidatorsIcon } from '@/common/components/page/Sidebar/LinksIcons/ValidatorsIcon'
import { WorkingGroupsIcon } from '@/common/components/page/Sidebar/LinksIcons/WorkingGroupsIcon'
import { LogoLink } from '@/common/components/page/Sidebar/LogoLink'
import { Navigation, NavigationInnerWrapper } from '@/common/components/page/Sidebar/Navigation'
import { NavigationExpandButton } from '@/common/components/page/Sidebar/NavigationExpandButton'
import { NavigationHeader } from '@/common/components/page/Sidebar/NavigationHeader'
import { NAVIGATION_LINK_GAP, NavigationLink } from '@/common/components/page/Sidebar/NavigationLink'
import { Colors, RemoveScrollbar } from '@/common/constants'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useToggle } from '@/common/hooks/useToggle'
import { CouncilRoutes, ElectionRoutes } from '@/council/constants'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { ForumRoutes } from '@/forum/constant'
import { ProfileComponent } from '@/memberships/components/ProfileComponent'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

export const SideBar = () => {
  const [comingSoonListActive, toggleComingSoonListActive] = useToggle(false)
  const { stage: electionStage } = useElectionStage()
  const [endpoints] = useNetworkEndpoints()

  const electionLink = electionStage === 'inactive' ? ElectionRoutes.pastElections : ElectionRoutes.currentElection

  return (
    <Navigation>
      <NavigationInnerWrapper>
        <NavigationHeader>
          <LogoLink />
          {/*<NotificationsButton*/}
          {/*  onClick={() => setNotificationsPanelOpen(!isNotificationsPanelOpen)}*/}
          {/*  isNotificationsPanelOpen={isNotificationsPanelOpen}*/}
          {/*/>*/}
        </NavigationHeader>
        <AnimateSharedLayout>
          <NavigationLinks>
            {/*Uncomment to see whole overview section*/}
            {/*<NavigationLinksItem>*/}
            {/*  <NavigationLink to={OverviewRoutes.overview} icon={<OverviewIcon />}>*/}
            {/*    Overview*/}
            {/*  </NavigationLink>*/}
            {/*</NavigationLinksItem>*/}
            <NavigationLinksItem>
              <NavigationLink to={ProfileRoutes.profile} icon={<MyProfileIcon />}>
                My profile
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationLink to={WorkingGroupsRoutes.groups} icon={<WorkingGroupsIcon />}>
                Working Groups
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationLink to={ProposalsRoutes.current} icon={<ProposalsIcon />}>
                Proposals
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationLink to={CouncilRoutes.council} icon={<CouncilIcon />}>
                Council
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationLink to={electionLink} icon={<ElectionIcon />} indicate={false}>
                Election
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationLink to={ForumRoutes.forum} icon={<ForumIcon />}>
                Forum
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationLink to={generatePath(MembersRoutes.members)} icon={<MembersIcon />}>
                Members
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationLink
                icon={<PolkadotSymbol />}
                to={`https://polkadot.js.org/apps/?rpc=${endpoints.nodeRpcEndpoint}#/explorer`}
              >
                Chain info
                <LinkSymbol color={Colors.Black[500]} className="sidebarLinkSymbol" />
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationLink icon={<SubscanSymbol />} to="https://joystream.subscan.io">
                Explorer
                <LinkSymbol color={Colors.Black[500]} className="sidebarLinkSymbol" />
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationLink to={SettingsRoutes.settings} icon={<SettingsIcon />}>
                Settings
              </NavigationLink>
            </NavigationLinksItem>
            <NavigationLinksItem>
              <NavigationExpandButton active={comingSoonListActive} onClick={toggleComingSoonListActive}>
                <Arrow direction="down" size="20" className="nav-icon" />
                COMING SOON
              </NavigationExpandButton>
            </NavigationLinksItem>
            <AnimatePresence>
              {comingSoonListActive && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ minHeight: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <NavigationLinksItem>
                    <NavigationLink to={BountyRoutes.bounties} icon={<BountyIcon />}>
                      Bounty
                    </NavigationLink>
                  </NavigationLinksItem>
                  <NavigationLinksItem>
                    <NavigationLink to="/inexisting" icon={<ConstitutionIcon />} disabled>
                      Constitution
                    </NavigationLink>
                  </NavigationLinksItem>
                  <NavigationLinksItem>
                    <NavigationLink to="/inexisting" icon={<FinancialsIcon />} disabled>
                      Financials
                    </NavigationLink>
                  </NavigationLinksItem>
                  <NavigationLinksItem>
                    <NavigationLink to="/inexisting" icon={<ValidatorsIcon />} disabled>
                      Validators
                    </NavigationLink>
                  </NavigationLinksItem>
                  <NavigationLinksItem>
                    <NavigationLink to="/inexisting" icon={<AppsIcon />} disabled>
                      Apps
                    </NavigationLink>
                  </NavigationLinksItem>
                  <NavigationLinksItem>
                    <NavigationLink to="/inexisting" icon={<StorageIcon />} disabled>
                      Storage
                    </NavigationLink>
                  </NavigationLinksItem>
                  <NavigationLinksItem>
                    <NavigationLink to="/inexisting" icon={<BandwidthIcon />} disabled>
                      Bandwidth
                    </NavigationLink>
                  </NavigationLinksItem>
                  <NavigationLinksItem>
                    <NavigationLink to="/inexisting" disabled icon={<ContentIcon />}>
                      Content
                    </NavigationLink>
                  </NavigationLinksItem>
                </motion.div>
              )}
            </AnimatePresence>
          </NavigationLinks>
        </AnimateSharedLayout>
        <ProfileComponent />
        <SidebarConnections />
      </NavigationInnerWrapper>
      {/*<Notifications onClose={onClose} isNotificationsPanelOpen={isNotificationsPanelOpen} />*/}
    </Navigation>
  )
}

const NavigationLinks = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-area: barlinks;
  list-style: none;
  max-height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  ${RemoveScrollbar};

  ${LinkSymbolStyle} {
    position: absolute;
    right: ${NAVIGATION_LINK_GAP}px;
  }
`

const NavigationLinksItem = styled.li`
  display: flex;
  height: fit-content;
  width: 100%;
  .sidebarLinkSymbol {
    grid-column: 6 !important;
  }
`
