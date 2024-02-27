import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { nameMapping } from '@/common/helpers'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { urlParamToWorkingGroupId } from '@/working-groups/model/workingGroupName'

import { AboutTab } from './AboutTab'
import { WorkerListSidebar } from './components/WorkerListSidebar'
import { WorkingGroupPageHeader } from './components/WorkingGroupPageHeader'

export const WorkingGroup = () => {
  const params = useParams<{ name: string }>()
  const name = urlParamToWorkingGroupId(params.name)

  const { isLoading, group } = useWorkingGroup({ name })

  return (
    <PageLayout
      header={<WorkingGroupPageHeader name={name} group={group} />}
      main={isLoading || !group ? <Loading /> : <AboutTab workingGroup={group} />}
      sidebar={!isLoading && group && <WorkerListSidebar workingGroup={group} />}
      sidebarScrollable
      lastBreadcrumb={nameMapping(name)}
    />
  )
}
