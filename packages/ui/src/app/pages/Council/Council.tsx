import React, { useMemo, useState } from 'react'

import { PageHeaderWithHint } from '@/app/components/PageHeaderWithHint'
import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { BlockDurationStatistics, MultiValueStat, Statistics } from '@/common/components/statistics'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { asBN } from '@/common/utils/bn'
import { CouncilList, CouncilOrder } from '@/council/components/councilList'
import { ViewElectionButton } from '@/council/components/ViewElectionButton'
import { useCouncilActivities } from '@/council/hooks/useCouncilActivities'
import { useCouncilorWithDetails } from '@/council/hooks/useCouncilorWithDetails'
import { useCouncilStatistics } from '@/council/hooks/useCouncilStatistics'
import { useElectedCouncil } from '@/council/hooks/useElectedCouncil'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { Councilor } from '@/council/types'

import { CouncilTabs } from './components/CouncilTabs'

export const Council = () => {
  const { stage: electionStage } = useElectionStage()

  const isRefetched = useRefetchQueries(
    { interval: MILLISECONDS_PER_BLOCK, include: ['GetElectedCouncil', 'GetCouncilEvents'] },
    []
  )

  const { council, isLoading } = useElectedCouncil()
  const { idlePeriodRemaining, budget, reward } = useCouncilStatistics()
  const { activities } = useCouncilActivities()

  const [order, setOrder] = useState<CouncilOrder>({ key: 'member' })
  const { councilors, isLoading: isLoadingCouncilors } = useCouncilorWithDetails(council)
  const sortedCouncilors = useMemo(() => councilors.sort(sortBy(order)), [councilors])
  const header = <PageHeaderWithHint title="Council" hintType="council" tabs={<CouncilTabs />} />

  const isCouncilorLoading = !isRefetched && (isLoading || isLoadingCouncilors)

  const rewardPerDay = useMemo(() => reward?.period?.mul(reward?.amount ?? asBN(0)) ?? asBN(0), [reward])
  const main = (
    <MainPanel>
      <Statistics>
        {electionStage === 'inactive' ? (
          <BlockDurationStatistics title="Normal period remaining length" value={idlePeriodRemaining} />
        ) : (
          <ViewElectionButton />
        )}
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
            { label: 'Per Day', value: rewardPerDay },
            { label: 'Per Week', value: rewardPerDay.mul(asBN(7)) },
          ]}
        />
      </Statistics>

      {!isCouncilorLoading && sortedCouncilors.length === 0 ? (
        <NotFoundText>There is no council member at the moment</NotFoundText>
      ) : (
        <CouncilList councilors={sortedCouncilors} order={order} onSort={setOrder} isLoading={isCouncilorLoading} />
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
  switch (key) {
    case 'member':
      return (a, b) => a.member.handle.localeCompare(b.member.handle) * direction
    default:
      return (a, b) => (asBN(a[key] ?? 0).gte(asBN(b[key] ?? 0)) ? 1 : -1) * direction
  }
}
