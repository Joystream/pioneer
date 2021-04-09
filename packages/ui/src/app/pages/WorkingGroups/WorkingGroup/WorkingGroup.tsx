import React from 'react'

import { Page } from '../../../../common/components/page/Page'
import { PageContent, ContentWithSidepanel, SidePanel } from '../../../../common/components/page/PageContent'
import { PageHeader } from '../../../../common/components/page/PageHeader'
import { PageTitle } from '../../../../common/components/page/PageTitle'
import { PreviousPage } from '../../../../common/components/page/PreviousPage'
import { Breadcrumbs } from '../../../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { Statistics } from '../../../../common/components/statistics/Stats'
import { Label } from '../../../../common/components/typography'
import { SideBar } from '../../../components/SideBar'
import { GroupContent } from '../Components'
import { OpeningsCategories, OpeningsCategory, OpeningsList, OpeningItem } from '../Openings/OpeningsComponents'

import { WorkingGroupTabs } from './WorkingGroupTabs'

export function WorkingGroup() {
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
          <PreviousPage>
            <PageTitle>Storage</PageTitle>
          </PreviousPage>
          <WorkingGroupTabs />
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
