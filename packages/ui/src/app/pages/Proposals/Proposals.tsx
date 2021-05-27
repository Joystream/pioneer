import React from 'react'

import { AppPage } from '@/app/components/AppPage'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, MainPanel, SidePanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useActivities } from '@/common/hooks/useActivities'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { NoProposals } from '@/proposals/components/NoProposals'
import { ProposalList } from '@/proposals/components/ProposalList'
import { useProposals } from '@/proposals/hooks/useProposals'

import { ProposalsTabs } from './components/ProposalsTabs'

export const Proposals = () => {
  const { proposals, isLoading } = useProposals()
  const activities = useActivities()

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Proposals</PageTitle>
        <AddProposalButton />
        <ProposalsTabs />
      </PageHeader>

      {proposals.length || isLoading ? (
        <ContentWithSidepanel>
          <MainPanel>{isLoading ? <Loading /> : <ProposalList proposals={proposals} />}</MainPanel>
          <SidePanel>
            <ActivitiesBlock activities={activities} label="Proposals Activities" />
          </SidePanel>
        </ContentWithSidepanel>
      ) : (
        <MainPanel>
          <NoProposals />
        </MainPanel>
      )}
    </AppPage>
  )
}
