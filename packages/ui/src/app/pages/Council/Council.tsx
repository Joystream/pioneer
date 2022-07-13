import BN from 'bn.js'
import React, { useMemo, useState } from 'react'

import { PageHeaderWithHint } from '@/app/components/PageHeaderWithHint'
import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { BlockDurationStatistics, MultiValueStat, Statistics } from '@/common/components/statistics'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { BN_ZERO } from '@/common/constants'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
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

  useRefetchQueries({ interval: MILLISECONDS_PER_BLOCK, include: ['GetElectedCouncil', 'GetCouncilEvents'] }, [])

  const { council, isLoading } = useElectedCouncil()
  const { idlePeriodRemaining, budget, reward } = useCouncilStatistics(council?.electedAt.number)
  const { activities } = useCouncilActivities()

  const [order, setOrder] = useState<CouncilOrder>({ key: 'member' })
  const { councilors, isLoading: isLoadingCouncilors } = useCouncilorWithDetails(council)
  const sortedCouncilors = useMemo(() => councilors.sort(sortBy(order)), [councilors])
  const header = <PageHeaderWithHint title="Council" hintType="council" tabs={<CouncilTabs />} />

  const main = (
    <MainPanel>
      <Statistics>
        {electionStage === 'inactive' && idlePeriodRemaining?.gt(BN_ZERO) ? (
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
            { label: 'Amount', value: reward.amount },
            { label: 'Period length', value: reward.period, type: 'blocks' },
          ]}
        />
      </Statistics>

      {!(isLoadingCouncilors || isLoading) && sortedCouncilors.length === 0 ? (
        <NotFoundText>There is no council member at the moment</NotFoundText>
      ) : (
        <CouncilList councilors={sortedCouncilors} order={order} onSort={setOrder} isLoading={isLoadingCouncilors} />
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
      return (a, b) => (new BN(a[key] ?? 0).gte(new BN(b[key] ?? 0)) ? 1 : -1) * direction
  }
}
