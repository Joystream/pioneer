import React, { useMemo, useState } from 'react'

import { Activities } from '../../../common/components/Activities'
import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../common/components/page/PageContent'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { StatisticItem, Statistics, TokenValueStat, TotalValue } from '../../../common/components/statistics'
import { Tabs } from '../../../common/components/Tabs'
import { Label, TextSmall } from '../../../common/components/typography'
import { useActivities } from '../../../common/hooks/useActivities'
import { MemberRoleHelp, MemberRoles } from '../../../memberships/components'
import { OpeningsList } from '../../../working-groups/components/OpeningsList'
import { useOpenings } from '../../../working-groups/hooks/useOpenings'
import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

type OpeningsTabs = 'OPENINGS' | 'UPCOMING'

export const WorkingGroupsOpenings = () => {
  const openings = useOpenings()
  const upcomingOpenings = openings.slice(0, 1)
  const activities = useActivities()

  const crumbs = useMemo(
    () => [
      { href: '#', text: 'Working Groups' },
      { href: '#', text: 'Openings' },
    ],
    []
  )
  const [activeTab, setActiveTab] = useState<OpeningsTabs>('OPENINGS')

  const openingsTabs = [
    {
      title: 'Openings',
      active: activeTab === 'OPENINGS',
      onClick: () => setActiveTab('OPENINGS'),
      count: openings.length,
    },
    {
      title: 'Upcoming openings',
      active: activeTab === 'UPCOMING',
      onClick: () => setActiveTab('UPCOMING'),
      count: upcomingOpenings.length,
    },
  ]

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs />
      </PageHeader>
      <ContentWithSidepanel>
        <MainPanel>
          <Statistics>
            <StatisticItem title="My Roles">
              <MemberRoles>
                <MemberRoleHelp memberRole="SP" helperText="Lorem fishy" size="l" />
                <MemberRoleHelp memberRole="FM" helperText="Lorem fishy" size="l" />
                <MemberRoleHelp memberRole="FL" helperText="Lorem fishy" size="l" />
                <MemberRoleHelp memberRole="CC" helperText="Lorem fishy" size="l" />
              </MemberRoles>
            </StatisticItem>
            <TokenValueStat title="Currently staking" value={200_000} />
            <StatisticItem title="Earned in past">
              <TextSmall>
                24 hours
                <TotalValue value={200} />
              </TextSmall>
              <TextSmall>
                <span>Month</span>
                <TotalValue value={102_000} />
              </TextSmall>
            </StatisticItem>
          </Statistics>
          <Tabs tabsSize="xs" tabs={openingsTabs} />
          <OpeningsList openings={activeTab === 'OPENINGS' ? openings : upcomingOpenings} />
        </MainPanel>
        <SidePanel>
          <Label>Working group activities</Label>
          <Activities activities={activities} />
        </SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}
