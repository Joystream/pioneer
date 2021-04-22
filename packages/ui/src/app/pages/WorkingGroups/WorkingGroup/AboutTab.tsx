import React from 'react'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
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
