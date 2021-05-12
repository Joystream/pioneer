import React from 'react'

import { AppPage } from '@/app/components/AppPage'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { NoProposals } from '@/proposals/components/NoProposals'

import { ProposalsTabs } from './components/ProposalsTabs'

export const Proposals = () => {
  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Proposals</PageTitle>
        <AddProposalButton />
        <ProposalsTabs />
      </PageHeader>
      <NoProposals />
    </AppPage>
  )
}
