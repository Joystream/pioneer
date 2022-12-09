import React, { useRef, useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ProposalOrderByInput } from '@/common/api/queries'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Pagination } from '@/common/components/Pagination'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useSort } from '@/common/hooks/useSort'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { ProposalEmptyFilter, ProposalFilters, ProposalFiltersState } from '@/proposals/components/ProposalFilters'
import { ProposalList } from '@/proposals/components/ProposalList'
import { usePastProposals } from '@/proposals/hooks/usePastProposals'
import { useProposals } from '@/proposals/hooks/useProposals'
import { useProposalsActivities } from '@/proposals/hooks/useProposalsActivities'

import { ProposalsTabs } from './components/ProposalsTabs'

export const PastProposals = () => {
  const searchSlot = useRef<HTMLDivElement>(null)
  const [filters, setFilters] = useState(ProposalEmptyFilter)

  const { types, stages } = usePastProposals()

  const { order, getSortProps } = useSort<ProposalOrderByInput>('statusSetAtTime')

  const { isLoading, proposals, pagination } = useProposals({ order: order, status: 'past', filters })

  const { activities } = useProposalsActivities()

  const [, setLastFilter] = useLocalStorage<string>('lastFilter')

  const onApplyFilter = (filter: ProposalFiltersState) => {
    setFilters(filter)
    setLastFilter(JSON.stringify(filter))
  }

  return (
    <PageLayout
      header={
        <FilterPageHeader ref={searchSlot} title="Proposals" buttons={<AddProposalButton />}>
          <ProposalsTabs />
        </FilterPageHeader>
      }
      main={
        <MainPanel>
          <ProposalFilters searchSlot={searchSlot} types={types} stages={stages} onApply={onApplyFilter} />
          <ProposalList getSortProps={getSortProps} proposals={proposals} isLoading={isLoading} isPast />
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
