import React from 'react'

import { SidePanel } from '@/common/components/page/SidePanel'
import { WorkersList } from '@/working-groups/components/WorkersList'
import { useWorkers } from '@/working-groups/hooks/useWorkers'
import { WorkingGroup } from '@/working-groups/types'

interface Props {
  workingGroup: WorkingGroup
}

export const WorkerListSidebar = ({ workingGroup }: Props) => {
  const { workers } = useWorkers({ groupId: workingGroup.id ?? '', status: 'active' })
  const lead = workingGroup.isActive ? workers?.find((worker) => worker.member.id === workingGroup.leadId) : undefined

  return (
    <SidePanel scrollable>
      <WorkersList lead={lead} workers={workers} />
    </SidePanel>
  )
}
