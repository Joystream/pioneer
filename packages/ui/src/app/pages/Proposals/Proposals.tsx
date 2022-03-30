import React from 'react'

import { PageHeaderWithHint } from '@/app/components/PageHeaderWithHint'
import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { MainPanel } from '@/common/components/page/PageContent'
import { SearchProcess } from '@/common/components/page/SearchProcess'
import { SidePanel } from '@/common/components/page/SidePanel'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { NoProposals } from '@/proposals/components/NoProposals'
import { ProposalList } from '@/proposals/components/ProposalList'
import { useProposals } from '@/proposals/hooks/useProposals'
import { useProposalsActivities } from '@/proposals/hooks/useProposalsActivities'

import { ProposalsTabs } from './components/ProposalsTabs'

export const Proposals = () => {
  const { proposals, isLoading } = useProposals({ status: 'active' })

  const { activities } = useProposalsActivities()

  return (
    <PageLayout
      header={
        <PageHeaderWithHint
          title="Proposals"
          hintType="proposals"
          tabs={<ProposalsTabs />}
          buttons={<AddProposalButton />}
        />
      }
      main={
        proposals.length || isLoading ? (
          <MainPanel>
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
          <SidePanel>
            <ActivitiesBlock activities={activities} label="Proposals Activities" />
          </SidePanel>
        )
      }
    />
  )
}
