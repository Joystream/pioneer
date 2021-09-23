import React, { useMemo, useRef } from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { CouncilList } from '@/council/components/councilList'
import { useElectedCouncil } from '@/council/hooks/useElectedCouncil'

import { CouncilTabs } from './components/CouncilTabs'

export const Council = () => {
  const { council, isLoading } = useElectedCouncil()
  const councilors = useMemo(() => council?.councilors ?? [], [council])
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Council</PageTitle>
      </PageHeaderRow>
      <CouncilTabs />
    </PageHeaderWrapper>
  )

  const main = (
    <MainPanel ref={sideNeighborRef}>
      <CouncilList councilors={councilors} onSort={() => undefined} isLoading={isLoading} />
    </MainPanel>
  )

  const sidebar = <SidePanel neighbor={sideNeighborRef} />

  return <PageLayout header={header} main={main} sidebar={sidebar} />
}
