import React, { useMemo } from 'react'

import { Loading } from '../../../common/components/Loading'
import { ContentWithTabs, MainPanel } from '../../../common/components/page/PageContent'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { Label, TextBig } from '../../../common/components/typography'
import { ApplicationsList } from '../../../working-groups/components/ApplicationsList'
import { useMyApplications } from '../../../working-groups/hooks/useMyApplications'
import { isPendingApplication } from '../../../working-groups/model/isPendingApplication'
import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const MyApplications = () => {
  const { applications, isLoading } = useMyApplications()
  const currentApplications = useMemo(() => applications?.filter(isPendingApplication), [applications, isLoading])
  const pastApplications = useMemo(() => applications?.filter((a) => !isPendingApplication(a)), [
    applications,
    isLoading,
  ])

  const displayLoadingOrEmptyState = () => {
    if (isLoading) {
      return <Loading />
    }

    return applications?.length ? null : <TextBig>No applications found</TextBig>
  }

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs />
      </PageHeader>
      <MainPanel>
        {displayLoadingOrEmptyState()}
        {currentApplications?.length ? (
          <ContentWithTabs>
            <Label>Current applications</Label>
            <ApplicationsList applications={currentApplications} />
          </ContentWithTabs>
        ) : null}
        {pastApplications?.length ? (
          <ContentWithTabs>
            <Label>Past applications</Label>
            <ApplicationsList applications={pastApplications} />
          </ContentWithTabs>
        ) : null}
      </MainPanel>
    </AppPage>
  )
}
