import React from 'react'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
import { Statistics, TokenValueStat } from '../../../../common/components/statistics'
import { NumericValueStat } from '../../../../common/components/statistics/NumericValueStat'
import { useMember } from '../../../../memberships/hooks/useMembership'
import { WorkersList } from '../../../../working-groups/components/WorkersList'
import { useWorkers } from '../../../../working-groups/hooks/useWorkers'
import { WorkingGroup } from '../../../../working-groups/types'

interface Props {
  workingGroup: WorkingGroup
}
export const AboutTab = ({ workingGroup }: Props) => {
  const { member: leader } = useMember(workingGroup.leaderId ?? '')
  const { workers } = useWorkers({ groupId: workingGroup.id ?? '' })

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <Statistics>
          <TokenValueStat title="Spending" helperText="Lorem ipsum..." value={workingGroup.budget} />
          <NumericValueStat title="Total hired" value={34} />
          <NumericValueStat title="Total fired" value={7} />
        </Statistics>
        <h4>Welcome</h4>
        <div>{workingGroup.description}</div>
        <h4>Status</h4>
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
