import React from 'react'

import { AppPage } from '@/app/components/AppPage'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { NoProposals } from '@/proposals/components/NoProposals'
import { ProposalList } from '@/proposals/components/ProposalList'
import { useProposals } from '@/proposals/hooks/useProposals'

import { ProposalsTabs } from './components/ProposalsTabs'

export const Proposals = () => {
  const { proposals, isLoading } = useProposals({ type: 'current' })

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Proposals</PageTitle>
        <AddProposalButton />
        <ProposalsTabs />
      </PageHeader>
      {isLoading ? (
        <MainPanel>
          <Loading />
        </MainPanel>
      ) : proposals.length ? (
        <ContentWithSidepanel>
          <MainPanel>
            <ProposalList proposals={proposals} />
          </MainPanel>
        </ContentWithSidepanel>
      ) : (
        <MainPanel>
          <NoProposals />
        </MainPanel>
      )}
    </AppPage>
  )
}
