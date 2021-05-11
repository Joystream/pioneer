import React from 'react'

import { Loading } from '@/common/components/Loading'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { TextBig } from '@/common/components/typography'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'

import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const MyRoles = () => {
  const { isLoading, workers } = useMyWorkers()

  console.warn(workers)

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs />
      </PageHeader>
      {isLoading ? <Loading /> : <TextBig>My roles</TextBig>}
    </AppPage>
  )
}
