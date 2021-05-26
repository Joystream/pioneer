import React from 'react'

import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ContentWithSidepanel, MainPanel, RowGapBlock, SidePanel } from '@/common/components/page/PageContent'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { useMember } from '@/memberships/hooks/useMembership'
import { WorkersList } from '@/working-groups/components/WorkersList'
import { useGroupStatistics } from '@/working-groups/hooks/useGroupStatistics'
import { useWorkers } from '@/working-groups/hooks/useWorkers'
import { WorkingGroup } from '@/working-groups/types'

import { StatusGroup, StatusBadge, StatusTitleGroup } from '../components/StatusBadges'

interface Props {
  workingGroup: WorkingGroup
}
export const AboutTab = ({ workingGroup }: Props) => {
  const { member: leader } = useMember(workingGroup.leaderId ?? '')
  const { workers } = useWorkers({ groupId: workingGroup.id ?? '' })
  const { statistics } = useGroupStatistics(workingGroup.id)

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <Statistics>
          <TokenValueStat title="Spending" tooltipText="Lorem ipsum..." value={statistics.spending} />
          <NumericValueStat title="Total hired" value={statistics.totalHired ?? 'Loading...'} />
          <NumericValueStat title="Total fired" value={statistics.totalFired ?? 'Loading...'} />
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
      <SidePanel>
        <WorkersList leader={leader} workers={workers} />
      </SidePanel>
    </ContentWithSidepanel>
  )
}
