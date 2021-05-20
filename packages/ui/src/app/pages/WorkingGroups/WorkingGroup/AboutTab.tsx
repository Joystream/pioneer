import React from 'react'
import styled from 'styled-components'

import { ContentWithSidepanel, MainPanel, SidePanel } from '@/common/components/page/PageContent'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { Colors } from '@/common/constants'
import { useMember } from '@/memberships/hooks/useMembership'
import { WorkersList } from '@/working-groups/components/WorkersList'
import { useGroupStatistics } from '@/working-groups/hooks/useGroupStatistics'
import { useWorkers } from '@/working-groups/hooks/useWorkers'
import { WorkingGroup } from '@/working-groups/types'

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
          <TokenValueStat title="Spending" helperText="Lorem ipsum..." value={statistics.spending} />
          <NumericValueStat title="Total hired" value={statistics.totalHired ?? 'Loading...'} />
          <NumericValueStat title="Total fired" value={statistics.totalFired ?? 'Loading...'} />
        </Statistics>
        <h4>Welcome</h4>
        <div>{workingGroup.description}</div>
        <StatusRow>
          <h4>Status</h4>
          {!!workingGroup.status && <StatusBadge>{workingGroup.status}</StatusBadge>}
        </StatusRow>
        <div>{workingGroup.statusMessage}</div>
        <h4>About</h4>
        <div>{workingGroup.about}</div>
      </MainPanel>
      <SidePanel>
        <WorkersList leader={leader} workers={workers} />
      </SidePanel>
    </ContentWithSidepanel>
  )
}

const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const StatusBadge = styled.div`
  background-color: ${Colors.Grey};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 8px;
  padding-right: 8px;
  margin-left: 32px;
`
