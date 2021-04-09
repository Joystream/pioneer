import React from 'react'

import { ContentWithSidepanel, SidePanel } from '../../../../common/components/page/PageContent'
import { Statistics } from '../../../../common/components/statistics/Stats'
import { Label } from '../../../../common/components/typography'
import { AppPage } from '../../../components/AppPage'
import { GroupContent } from '../Components'
import { OpeningItem, OpeningsCategories, OpeningsCategory, OpeningsList } from '../Openings/OpeningsComponents'

export function WorkingGroup() {
  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Storage' },
  ]

  const tabs = [
    { title: 'Openings', active: true, onClick: () => undefined },
    { title: 'About', active: false, onClick: () => undefined },
    { title: 'History', active: false, onClick: () => undefined },
  ]

  return (
    <AppPage pageTitle="Storage" crumbs={crumbs} tabs={tabs}>
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
    </AppPage>
  )
}
