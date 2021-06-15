import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'

import { Loading } from '../../../common/components/Loading'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { WorkingGroupsList } from '../../../working-groups/components/WorkingGroupsList'
import { useWorkingGroups } from '../../../working-groups/hooks/useWorkingGroups'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const WorkingGroups = () => {
  const { isLoading, groups } = useWorkingGroups()

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageLayout
      header={
        <PageHeader>
          <PageTitle>Working Groups</PageTitle>
          <WorkingGroupsTabs />
        </PageHeader>
      }
      main={<WorkingGroupsList groups={groups} />}
    />
  )
}
