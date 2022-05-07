import React, { useRef, useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { MainPanel } from '@/common/components/page/PageContent'
import { SearchProcess } from '@/common/components/page/SearchProcess'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Pagination } from '@/common/components/Pagination'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { ProposalEmptyFilter, ProposalFilters } from '@/proposals/components/ProposalFilters'
import { ProposalList } from '@/proposals/components/ProposalList'
import { usePastProposals } from '@/proposals/hooks/usePastProposals'
import { useProposals } from '@/proposals/hooks/useProposals'
import { useProposalsActivities } from '@/proposals/hooks/useProposalsActivities'

import { ProposalsTabs } from './components/ProposalsTabs'

export const PastProposals = () => {
  const searchSlot = useRef<HTMLDivElement>(null)
  const [filters, setFilters] = useState(ProposalEmptyFilter)

  const { types, stages } = usePastProposals()
  const { isLoading, proposals, pagination } = useProposals({ status: 'past', filters })

  const { activities } = useProposalsActivities()

  return (
    <PageLayout
      header={
        <FilterPageHeader ref={searchSlot} title="Proposals" buttons={<AddProposalButton />}>
          <ProposalsTabs />
        </FilterPageHeader>
      }
      main={
        <MainPanel>
          <ProposalFilters searchSlot={searchSlot} types={types} stages={stages} onApply={setFilters} />
          {isLoading ? (
            <SearchProcess
              title="Searching"
              description="We are searching through all past proposals to find what your are looking for. "
            />
          ) : (
            <ProposalList proposals={proposals} isPast />
          )}
          <Pagination {...pagination} />
        </MainPanel>
      }
      sidebar={
        <SidePanel>
          <ActivitiesBlock activities={activities} label="Proposals Activities" />
        </SidePanel>
      }
    />
  )
}
