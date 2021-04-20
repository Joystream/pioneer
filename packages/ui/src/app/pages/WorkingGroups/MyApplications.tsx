import React, { useMemo } from 'react'

import { Loading } from '../../../common/components/Loading'
import { MainPanel } from '../../../common/components/page/PageContent'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { Label, TextBig } from '../../../common/components/typography'
import { ApplicationsList } from '../../../working-groups/components/ApplicationsList'
import { useMyApplications } from '../../../working-groups/hooks/useMyApplications'
import { WorkingGroupApplication } from '../../../working-groups/types/WorkingGroupApplication'
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
  const { applications, isLoading } = useMyApplications()
  const isPending = (a: WorkingGroupApplication) => a.status == 'ApplicationStatusPending'
  const currentApplications = useMemo(() => applications?.filter(isPending), [applications])
  const pastApplications = useMemo(() => applications?.filter((a) => !isPending(a)), [applications])
  const displayState = () => {
    if (isLoading) return <Loading />
    return applications?.length ? null : <TextBig>No applications found</TextBig>
  }

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs />
      </PageHeader>
      {displayState()}
      <MainPanel>
        {currentApplications?.length ? (
          <>
            <Label>Current applications</Label>
            <ApplicationsList applications={currentApplications} />
          </>
        ) : null}
        {pastApplications?.length ? (
          <>
            <Label>Past applications</Label>
            <ApplicationsList applications={pastApplications} />
          </>
        ) : null}
      </MainPanel>
    </AppPage>
  )
}
