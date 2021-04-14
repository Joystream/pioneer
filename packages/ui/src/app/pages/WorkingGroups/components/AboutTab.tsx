import React from 'react'
import { useParams } from 'react-router-dom'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
import { useMember } from '../../../../memberships/hooks/useMembership'
import { WorkersList } from '../../../../working-groups/components/WorkersList'
import { useWorkingGroup } from '../../../../working-groups/hooks/useWorkingGroup'

export function AboutTab() {
  const { id } = useParams<{ id: string }>()
  const group = useWorkingGroup(id)

  const { member: leader } = useMember('1')

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <h4>Welcome</h4>
        <div>{group?.description}</div>
        <h4>Status</h4>
        <div>{group?.statusMessage}</div>
        <h4>About</h4>
        <div>{group?.about}</div>
      </MainPanel>
      <SidePanel>
        <WorkersList leader={leader} />
      </SidePanel>
    </ContentWithSidepanel>
  )
}
