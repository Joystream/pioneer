import React from 'react'

import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { StatisticItem, Statistics, TokenValueStat } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { isDefined } from '@/common/utils'
import { WorkersList } from '@/working-groups/components/WorkersList'
import { useGroupStatistics } from '@/working-groups/hooks/useGroupStatistics'
import { useWorkers } from '@/working-groups/hooks/useWorkers'
import { WorkingGroup } from '@/working-groups/types'

import { StatusBadge, StatusGroup, StatusTitleGroup } from '../components/StatusBadges'

interface Props {
  workingGroup: WorkingGroup
}

export const AboutTab = ({ workingGroup }: Props) => {
  const { statistics } = useGroupStatistics(workingGroup.id)

  return (
    <MainPanel>
      <Statistics>
        {statistics.spending ? (
          <TokenValueStat
            title="Spending"
            tooltipText="Total spending of the working group during the council term."
            value={statistics.spending}
          />
        ) : (
          <StatisticItem centered>
            <Loading />
          </StatisticItem>
        )}
        {isDefined(statistics.totalHired) ? (
          <NumericValueStat title="Total hired" value={statistics.totalHired} />
        ) : (
          <StatisticItem centered>
            <Loading />
          </StatisticItem>
        )}
        {isDefined(statistics.totalFired) ? (
          <NumericValueStat title="Total fired" value={statistics.totalFired} />
        ) : (
          <StatisticItem centered>
            <Loading />
          </StatisticItem>
        )}
      </Statistics>
      <RowGapBlock gap={32}>
        {workingGroup.description && (
          <RowGapBlock gap={16}>
            <h4>Welcome</h4>
            <MarkdownPreview markdown={workingGroup.description} />
          </RowGapBlock>
        )}
        {!!workingGroup.status && (
          <RowGapBlock gap={16}>
            <StatusTitleGroup>
              <h4>Status</h4>
              <StatusGroup>
                <StatusBadge>{workingGroup.status}</StatusBadge>
              </StatusGroup>
            </StatusTitleGroup>
            {workingGroup.statusMessage && <MarkdownPreview markdown={workingGroup.statusMessage} />}
          </RowGapBlock>
        )}
        {workingGroup.about && (
          <RowGapBlock gap={16}>
            <h4>About</h4>
            <MarkdownPreview markdown={workingGroup.about} />
          </RowGapBlock>
        )}
      </RowGapBlock>
    </MainPanel>
  )
}

export const AboutTabSidebar = ({ workingGroup }: Props) => {
  const { workers } = useWorkers({ groupId: workingGroup.id ?? '', status: 'active' })
  const lead = workers?.find((worker) => worker.member.id === workingGroup.leadId)

  return (
    <SidePanel scrollable>
      <WorkersList lead={lead} workers={workers} />
    </SidePanel>
  )
}
