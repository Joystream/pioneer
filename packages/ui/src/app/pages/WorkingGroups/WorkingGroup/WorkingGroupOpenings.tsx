import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { urlParamToWorkingGroupId } from '@/working-groups/model/workingGroupName'

import { WorkingGroupPageHeader } from './components/WorkingGroupPageHeader'
import { OpeningsTab, OpeningsTabSidebar } from './OpeningsTab'

export function WorkingGroupOpenings() {
  const { name } = useParams<{ name: string }>()
  const { isLoading, group } = useWorkingGroup({ name: urlParamToWorkingGroupId(name) })

  return (
    <PageLayout
      header={<WorkingGroupPageHeader group={group} withButtons />}
      main={isLoading || !group ? <Loading /> : <OpeningsTab workingGroup={group} />}
      sidebar={!isLoading && group && <OpeningsTabSidebar workingGroup={group} />}
      sidebarScrollable
      lastBreadcrumb="Openings"
    />
  )
}
