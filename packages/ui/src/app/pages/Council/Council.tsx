import React, { useMemo, useState } from 'react'

import { PageHeaderWithHint } from '@/app/components/PageHeaderWithHint'
import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { BlockDurationStatistics, MultiValueStat, Statistics } from '@/common/components/statistics'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { CouncilList, CouncilOrder } from '@/council/components/councilList'
import { useCouncilActivities } from '@/council/hooks/useCouncilActivities'
import { useCouncilStatistics } from '@/council/hooks/useCouncilStatistics'
import { useElectedCouncil } from '@/council/hooks/useElectedCouncil'
import { Councilor } from '@/council/types'

import { CouncilTabs } from './components/CouncilTabs'

export const Council = () => {
  const { council, isLoading } = useElectedCouncil()
  const { idlePeriodRemaining, budget, reward } = useCouncilStatistics(council?.electedAtBlock)
  const { activities } = useCouncilActivities()

  const [order, setOrder] = useState<CouncilOrder>({ key: 'member' })
  const councilors = useMemo(() => council?.councilors.slice(0).sort(sortBy(order)) ?? [], [council])

  const header = <PageHeaderWithHint title="Council" hintType="council" tabs={<CouncilTabs />} />

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

  const sidebar = (
    <SidePanel>
      <ActivitiesBlock activities={activities} label="Council Activities" />
    </SidePanel>
  )

  return <PageLayout header={header} main={main} sidebar={sidebar} />
}

const sortBy = ({ key, isDescending }: CouncilOrder): ((a: Councilor, b: Councilor) => number) => {
  const direction = isDescending ? -1 : 1
  return key === 'member'
    ? (a, b) => a.member.handle.localeCompare(b.member.handle) * direction
    : (a, b) => (a[key] - b[key]) * direction
}
