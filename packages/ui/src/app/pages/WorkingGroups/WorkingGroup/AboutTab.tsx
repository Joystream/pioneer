import React from 'react'
import styled from 'styled-components'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
import { Colors } from '../../../../common/constants'
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
