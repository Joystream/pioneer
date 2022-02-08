import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { OverviewInfoElement } from '@/overview/components/OverviewInfoElement'
import { OverviewWrapper } from '@/overview/components/OverviewWrapper'
import { WorkingGroupsRoutes } from '@/working-groups/constants'
import { useCountWorkers } from '@/working-groups/hooks/useCountWorkers'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'

import { WorkingGroupsTilesList } from './WorkingGroupsTilesList'
import { Loading } from '@/common/components/Loading'

export const WorkingGroupsOverview = () => {
  const { t } = useTranslation('overview')
  const { groups, isLoading: groupsLoading } = useWorkingGroups()
  const { workers: workersCount, isLoading: workersCountLoading } = useCountWorkers()
  const { openings } = useOpenings({ type: 'open' })
  const groupsCount = useMemo(() => groups.length, [groups])

  const totalBudget = useMemo(
    () => groups.reduce((previous, current) => previous.add(current.budget), BN_ZERO),
    [groups]
  )

  const infoElements = useMemo(
    () => (
      <>
        {groupsLoading ? <Loading /> : <OverviewInfoElement value={groupsCount} label={t('workingGroups.workingGroups')} />}
        {workersCountLoading ? <Loading /> : <OverviewInfoElement value={workersCount} label={t('workingGroups.workers')} />}
        {groupsLoading ? <Loading /> : <OverviewInfoElement value={<TokenValue value={totalBudget} />} label={t('workingGroups.totalBudget')} />}
      </>
    ),
    [t, groupsCount, workersCount, totalBudget]
  )

  return (
    <OverviewWrapper
      title={t('workingGroups.title')}
      linkPath={WorkingGroupsRoutes.groups}
      infoElements={infoElements}
      scroller={<WorkingGroupsTilesList openings={openings} />}
    />
  )
}
