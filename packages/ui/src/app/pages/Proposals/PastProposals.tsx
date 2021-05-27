import React from 'react'

import { AppPage } from '@/app/components/AppPage'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, MainPanel, SidePanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useActivities } from '@/common/hooks/useActivities'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { ProposalList } from '@/proposals/components/ProposalList'
import { usePastProposals } from '@/proposals/hooks/usePastProposals'

import { ProposalsTabs } from './components/ProposalsTabs'

export const PastProposals = () => {
  const { proposals, isLoading } = usePastProposals()
  const activities = useActivities()

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Proposals</PageTitle>
        <AddProposalButton />
        <ProposalsTabs />
      </PageHeader>

      <ContentWithSidepanel>
        <MainPanel>{isLoading ? <Loading /> : <ProposalList proposals={proposals} isPast />}</MainPanel>
        <SidePanel>
          <ActivitiesBlock activities={activities} label="Proposals Activities" />
        </SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}
