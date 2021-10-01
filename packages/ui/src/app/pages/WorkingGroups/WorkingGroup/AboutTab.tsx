import React, { useRef } from 'react'

import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ContentWithSidepanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { StatisticItem, Statistics, TokenValueStat } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { WorkersList } from '@/working-groups/components/WorkersList'
import { useGroupStatistics } from '@/working-groups/hooks/useGroupStatistics'
import { useWorkers } from '@/working-groups/hooks/useWorkers'
import { WorkingGroup } from '@/working-groups/types'

import { StatusBadge, StatusGroup, StatusTitleGroup } from '../components/StatusBadges'

interface Props {
  workingGroup: WorkingGroup
}
export const AboutTab = ({ workingGroup }: Props) => {
  const { workers } = useWorkers({ groupId: workingGroup.id ?? '', status: 'active' })
  const { statistics } = useGroupStatistics(workingGroup.id)
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  const lead = workers?.find((worker) => worker.member.id === workingGroup.leadId)

  return (
    <ContentWithSidepanel>
      <MainPanel ref={sideNeighborRef}>
        <Statistics>
          {statistics.spending ? (
            <TokenValueStat title="Spending" tooltipText="Lorem ipsum..." value={statistics.spending} />
          ) : (
            <StatisticItem centered>
              <Loading />
            </StatisticItem>
          )}
          {statistics.totalHired ? (
            <NumericValueStat title="Total hired" value={statistics.totalHired} />
          ) : (
            <StatisticItem centered>
              <Loading />
            </StatisticItem>
          )}
          {statistics.totalFired ? (
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
      <SidePanel neighbor={sideNeighborRef}>
        <WorkersList lead={lead} workers={workers} />
      </SidePanel>
    </ContentWithSidepanel>
  )
}
