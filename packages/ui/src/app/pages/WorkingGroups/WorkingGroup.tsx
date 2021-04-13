import React from 'react'
import styled from 'styled-components'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../common/components/page/PageContent'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { PreviousPage } from '../../../common/components/page/PreviousPage'
import { Statistics, TokenValueStat } from '../../../common/components/statistics'
import { Tabs } from '../../../common/components/Tabs'
import { Label } from '../../../common/components/typography'
import { OpeningsList } from '../../../working-groups/components/OpeningsList'
import { useOpenings } from '../../../working-groups/hooks/useOpenings'
import { AppPage } from '../../components/AppPage'

export function WorkingGroup() {
  const openings = useOpenings()

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
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PreviousPage>
          <PageTitle>Storage</PageTitle>
        </PreviousPage>
        <Tabs tabs={tabs} />
      </PageHeader>
      <ContentWithSidepanel>
        <MainPanel>
          <Statistics>
            <TokenValueStat title="Current budget" helperText="Lorem ipsum..." value={150_200} />
            <TokenValueStat title="Working Group dept" helperText="Lorem ipsum..." value={-200} />
            <TokenValueStat title="Avg stake" helperText="Lorem ipsum..." value={100_000} />
          </Statistics>
          <OpeningsCategories>
            <OpeningsCategory>
              <Label>Upcoming openings</Label>
              <OpeningsList openings={openings} />
            </OpeningsCategory>
            <OpeningsCategory>
              <Label>Openings</Label>
              <OpeningsList openings={openings} />
            </OpeningsCategory>
          </OpeningsCategories>
        </MainPanel>
        <SidePanel>
          <Label>Leader</Label>
          <Label>Workers</Label>
        </SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}

export const OpeningsCategories = styled.div`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
`

export const OpeningsCategory = styled.div`
  display: grid;
  grid-row-gap: 16px;
  width: 100%;
`
