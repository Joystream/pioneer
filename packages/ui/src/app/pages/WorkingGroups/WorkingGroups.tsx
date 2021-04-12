import React from 'react'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { WorkingGroupsList } from '../../../working-groups/components/WorkingGroupsList'
import { useWorkingGroups } from '../../../working-groups/hooks/useWorkingGroups'
import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const WorkingGroups = () => {
  const { isLoading, groups } = useWorkingGroups()

  if (isLoading) {
    return null
  }

  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Working Groups' },
  ]

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs active="Working Groups" />
      </PageHeader>
      <WorkingGroupsList groups={groups} />
    </AppPage>
  )
}
