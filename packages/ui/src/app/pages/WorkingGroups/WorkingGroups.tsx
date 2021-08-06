import React from 'react'

import { PageLayout, PageHeaderWrapper } from '@/app/components/PageLayout'

import { Loading } from '../../../common/components/Loading'
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
        <PageHeaderWrapper>
          <PageTitle>Working Groups</PageTitle>
          <WorkingGroupsTabs />
        </PageHeaderWrapper>
      }
      main={<WorkingGroupsList groups={groups} />}
    />
  )
}
