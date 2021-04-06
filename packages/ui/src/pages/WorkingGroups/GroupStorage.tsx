import React from 'react'

import { Page } from '../../components/page/Page'
import { PageContent, ContentWithSidepanel, SidePanel } from '../../components/page/PageContent'
import { PageHeader } from '../../components/page/PageHeader'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Breadcrumbs } from '../../components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { Statistics } from '../../components/statistics/Stats'
import { Label } from '../../components/typography'
import { GroupContent } from './GroupsComponents'
import { GroupStorageTabs } from './GroupStorageTabs'
import { OpeningsCategories, OpeningsCategory, OpeningsList, OpeningItem } from './Openings/OpeningsComponents'

export function GroupStorage() {
  return (
    <Page>
      <SideBar />
      <PageContent>
        <Breadcrumbs
          crumbs={[
            { href: '#', text: 'Working Groups' },
            { href: '#', text: 'Working Groups' },
            { href: '#', text: 'Storage' },
          ]}
        />
        <PageHeader>
          <PageTitle>Storage</PageTitle>
          <GroupStorageTabs />
          <ContentWithSidepanel>
            <GroupContent>
              <Statistics
                stats={[
                  { title: 'Current budget', helperText: 'Lorem fishy', value: 150200 },
                  { title: 'Working Group Debt', helperText: 'Lorem fishy', value: -200 },
                  { title: 'Avg Stake', helperText: 'Lorem fishy', value: 100000 },
                ]}
              />
              <OpeningsCategories>
                <OpeningsCategory>
                  <Label>Upcoming openings</Label>
                  <OpeningsList>
                    <OpeningItem />
                  </OpeningsList>
                </OpeningsCategory>
                <OpeningsCategory>
                  <Label>Openings</Label>
                  <OpeningsList>
                    <OpeningItem />
                  </OpeningsList>
                </OpeningsCategory>
              </OpeningsCategories>
            </GroupContent>
            <SidePanel>Some content</SidePanel>
          </ContentWithSidepanel>
        </PageHeader>
      </PageContent>
    </Page>
  )
}
