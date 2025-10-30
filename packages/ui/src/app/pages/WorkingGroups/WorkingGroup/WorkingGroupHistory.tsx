import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { urlParamToWorkingGroupId } from '@/working-groups/model/workingGroupName'

import { WorkingGroupPageHeader } from './components/WorkingGroupPageHeader'
import { HistoryTab, HistoryTabSidebar } from './HistoryTab'

export function WorkingGroupHistory() {
  const params = useParams<{ name: string }>()
  const name = urlParamToWorkingGroupId(params.name)

  const { isLoading, group } = useWorkingGroup({ name })

  return (
    <PageLayout
      header={<WorkingGroupPageHeader name={name} group={group} />}
      main={isLoading || !group ? <Loading /> : <HistoryTab workingGroup={group} />}
      sidebar={!isLoading && group && <HistoryTabSidebar workingGroup={group} />}
      sidebarScrollable
      lastBreadcrumb="History"
    />
  )
}
