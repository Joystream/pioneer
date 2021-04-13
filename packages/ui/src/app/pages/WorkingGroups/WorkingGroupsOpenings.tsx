import React, { useMemo, useState } from 'react'

import { Activities } from '../../../common/components/Activities'
import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../common/components/page/PageContent'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '../../../common/components/statistics'
import { Tabs } from '../../../common/components/Tabs'
import { Label } from '../../../common/components/typography'
import { useActivities } from '../../../common/hooks/useActivities'
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
            <TokenValueStat title="My Roles" helperText="Lorem ipsum..." value={5} />
            <TokenValueStat title="Currently staking" helperText="Lorem ipsum..." value={5} />
            <TokenValueStat title="Earned in past" helperText="Lorem ipsum..." value={5} />
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
