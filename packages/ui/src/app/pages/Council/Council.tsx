import React, { useMemo, useState } from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { BlockDurationStatistics, MultiValueStat, Statistics } from '@/common/components/statistics'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { CouncilList, CouncilOrder } from '@/council/components/councilList'
import { useCouncilStatistics } from '@/council/hooks/useCouncilStatistics'
import { useElectedCouncil } from '@/council/hooks/useElectedCouncil'
import { Councilor } from '@/council/types'

import { CouncilTabs } from './components/CouncilTabs'

export const Council = () => {
  const { council, isLoading } = useElectedCouncil()
  const { idlePeriodRemaining, budget, reward } = useCouncilStatistics(council?.electedAtBlock)

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
    <MainPanel>
      <Statistics>
        <BlockDurationStatistics title="Normal period remaining length" value={idlePeriodRemaining} />
        <MultiValueStat
          title="Budget"
          values={[
            { label: 'Amount', value: budget.amount },
            { label: 'Period length', value: budget.refillPeriod, type: 'blocks' },
          ]}
        />
        <MultiValueStat
          title="Councilor Reward"
          values={[
            { label: 'Amount', value: reward.amount },
            { label: 'Period length', value: reward.period, type: 'blocks' },
          ]}
        />
      </Statistics>

      {!isLoading && councilors.length === 0 ? (
        <NotFoundText>There is no council member at the moment</NotFoundText>
      ) : (
        <CouncilList councilors={councilors} order={order} onSort={setOrder} isLoading={isLoading} />
      )}
    </MainPanel>
  )

  const sidebar = <SidePanel />

  return <PageLayout header={header} main={main} sidebar={sidebar} />
}

const sortBy = ({ key, isDescending }: CouncilOrder): ((a: Councilor, b: Councilor) => number) => {
  const direction = isDescending ? -1 : 1
  return key === 'member'
    ? (a, b) => a.member.handle.localeCompare(b.member.handle) * direction
    : (a, b) => (a[key] - b[key]) * direction
}
