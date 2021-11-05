import React from 'react'

import { PageHeaderWithHint } from '@/app/components/PageHeaderWithHint'
import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { WorkingGroupsList } from '@/working-groups/components/WorkingGroupsList'
import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const WorkingGroups = () => {
  const { isLoading, groups } = useWorkingGroups()

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageLayout
      header={<PageHeaderWithHint title="Working Groups" hintType="workingGroups" tabs={<WorkingGroupsTabs />} />}
      main={<WorkingGroupsList groups={groups} />}
    />
  )
}
