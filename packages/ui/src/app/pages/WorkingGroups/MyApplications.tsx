import React, { useMemo } from 'react'

import { MainPanel } from '../../../common/components/page/PageContent'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { Label, TextBig } from '../../../common/components/typography'
import { ApplicationsList } from '../../../working-groups/components/ApplicationsList'
import { useApplications } from '../../../working-groups/hooks/useApplications'
import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const MyApplications = () => {
  const crumbs = useMemo(
    () => [
      { href: '#', text: 'Working Groups' },
      { href: '#', text: 'My Applications' },
    ],
    []
  )
  const applications = useApplications()

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs />
      </PageHeader>
      <TextBig>My Applications</TextBig>
      <MainPanel>
        <Label>CURRENT APPLICATIONS</Label>
        <ApplicationsList applications={applications} />
        <Label>PAST APPLICATIONS</Label>
        <ApplicationsList applications={applications} />
      </MainPanel>
    </AppPage>
  )
}
