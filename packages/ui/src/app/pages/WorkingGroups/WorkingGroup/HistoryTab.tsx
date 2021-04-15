import React from 'react'
import { useParams } from 'react-router-dom'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
import { useWorkingGroup } from '../../../../working-groups/hooks/useWorkingGroup'

export function HistoryTab() {
  const { id } = useParams<{ id: string }>()
  useWorkingGroup(id)

  return (
    <ContentWithSidepanel>
      <MainPanel>main</MainPanel>
      <SidePanel>side</SidePanel>
    </ContentWithSidepanel>
  )
}
