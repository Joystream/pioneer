import React, { useMemo, useRef, useState } from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { CouncilList, CouncilOrder } from '@/council/components/councilList'
import { useElectedCouncil } from '@/council/hooks/useElectedCouncil'
import { Councilor } from '@/council/types'

import { CouncilTabs } from './components/CouncilTabs'

export const Council = () => {
  const { council, isLoading } = useElectedCouncil()
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  const [order, setOrder] = useState<CouncilOrder>({ key: 'member' })
  const councilors = useMemo(() => council?.councilors.slice(0).sort(sortBy(order)) ?? [], [council])

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
      <CouncilList councilors={councilors} order={order} onSort={setOrder} isLoading={isLoading} />
    </MainPanel>
  )

  const sidebar = <SidePanel neighbor={sideNeighborRef} />

  return <PageLayout header={header} main={main} sidebar={sidebar} />
}

const sortBy = ({ key, isDescending }: CouncilOrder): ((a: Councilor, b: Councilor) => number) => {
  const direction = isDescending ? -1 : 1
  return key === 'member'
    ? (a, b) => a.member.handle.localeCompare(b.member.handle) * direction
    : (a, b) => (a[key] - b[key]) * direction
}
