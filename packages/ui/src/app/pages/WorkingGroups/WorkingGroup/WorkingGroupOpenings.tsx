import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { urlParamToWorkingGroupId } from '@/working-groups/model/workingGroupName'

import { WorkerListSidebar } from './components/WorkerListSidebar'
import { WorkingGroupPageHeader } from './components/WorkingGroupPageHeader'
import { OpeningsTab } from './OpeningsTab'

export function WorkingGroupOpenings() {
  const params = useParams<{ name: string }>()
  const name = urlParamToWorkingGroupId(params.name)

  const { isLoading, group } = useWorkingGroup({ name })

  return (
    <PageLayout
      header={<WorkingGroupPageHeader name={name} group={group} withButtons />}
      main={isLoading || !group ? <Loading /> : <OpeningsTab workingGroup={group} />}
      sidebar={!isLoading && group && <WorkerListSidebar workingGroup={group} />}
      sidebarScrollable
      lastBreadcrumb="Openings"
    />
  )
}
