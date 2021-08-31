import React, { useMemo } from 'react'

import { PageLayout, PageHeaderWrapper } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Label } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { ApplicationsList } from '@/working-groups/components/ApplicationsList'
import { useMyApplications } from '@/working-groups/hooks/useMyApplications'
import { isPendingApplication } from '@/working-groups/model/isPendingApplication'

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

    return applications?.length || pastApplications?.length ? null : <NotFoundText>No applications found</NotFoundText>
  }

  return (
    <PageLayout
      header={
        <PageHeaderWrapper>
          <PageTitle>Working Groups</PageTitle>
          <WorkingGroupsTabs />
        </PageHeaderWrapper>
      }
      main={
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
              <ApplicationsList applications={pastApplications} pastApplications />
            </ContentWithTabs>
          ) : null}
        </MainPanel>
      }
    />
  )
}
