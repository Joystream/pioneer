import React, { useRef } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { Loading } from '@/common/components/Loading'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { useActivities } from '@/common/hooks/useActivities'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { NoProposals } from '@/proposals/components/NoProposals'
import { ProposalList } from '@/proposals/components/ProposalList'
import { useProposals } from '@/proposals/hooks/useProposals'

import { ProposalsTabs } from './components/ProposalsTabs'

export const Proposals = () => {
  const { proposals, isLoading } = useProposals({ status: 'active' })
  const activities = useActivities()
  const sideNeighborRef = useRef<HTMLDivElement>(null)
  return (
    <PageLayout
      header={
        <PageHeader>
          <PageTitle>Proposals</PageTitle>
          <AddProposalButton />
          <ProposalsTabs />
        </PageHeader>
      }
      main={
        proposals.length || isLoading ? (
          <MainPanel ref={sideNeighborRef}>
            {isLoading ? <Loading /> : <ProposalList proposals={proposals} />}
          </MainPanel>
        ) : (
          <MainPanel>
            <NoProposals />
          </MainPanel>
        )
      }
      sidebar={
        (proposals.length || isLoading) && (
          <SidePanel neighbor={sideNeighborRef}>
            <ActivitiesBlock activities={activities} label="Proposals Activities" />
          </SidePanel>
        )
      }
    />
  )
}
