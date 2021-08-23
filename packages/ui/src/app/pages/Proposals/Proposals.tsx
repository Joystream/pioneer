import React, { useRef } from 'react'

import { PageLayout, PageHeaderWrapper, PageHeaderRow } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { ButtonsGroup } from '@/common/components/buttons'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SearchProcess } from '@/common/components/page/SearchProcess'
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
        <PageHeaderWrapper>
          <PageHeaderRow>
            <PageTitle>Proposals</PageTitle>
            <ButtonsGroup>
              <AddProposalButton />
            </ButtonsGroup>
          </PageHeaderRow>
          <ProposalsTabs />
        </PageHeaderWrapper>
      }
      main={
        proposals.length || isLoading ? (
          <MainPanel ref={sideNeighborRef}>
            {isLoading ? (
              <SearchProcess
                title="Searching"
                description="We are searching through all past proposals to find what your are looking for."
              />
            ) : (
              <ProposalList proposals={proposals} />
            )}
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
