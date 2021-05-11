import React from 'react'

import {Loading} from '@/common/components/Loading'
import {PageHeader} from '@/common/components/page/PageHeader'
import {PageTitle} from '@/common/components/page/PageTitle'
import {Label, TextBig} from '@/common/components/typography'
import {useMyWorkers} from '@/working-groups/hooks/useMyWorkers'
import {AppPage} from '@/app/components/AppPage'
import {WorkingGroupsTabs} from './components/WorkingGroupsTabs'
import {ContentWithTabs} from '@/common/components/page/PageContent'

export const MyRoles = () => {
  const {isLoading, workers} = useMyWorkers()

  const displayCurrentRoles = () => {
    if (isLoading) {
      return <Loading/>
    }

    if (!workers?.length) {
      return <TextBig>No roles found</TextBig>
    }

    return workers?.length ? null : <TextBig>No roles found</TextBig>
  }

  console.warn(workers)

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs/>
      </PageHeader>
      <ContentWithTabs>
        <Label>Current roles</Label>
        {displayCurrentRoles()}
      </ContentWithTabs>
    </AppPage>
  )
}
