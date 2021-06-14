import React, { useRef, useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { Loading } from '@/common/components/Loading'
import { MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { useActivities } from '@/common/hooks/useActivities'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { ProposalEmptyFilter, ProposalFilters } from '@/proposals/components/ProposalFilters'
import { ProposalList } from '@/proposals/components/ProposalList'
import { usePastProposals } from '@/proposals/hooks/usePastProposals'
import { useProposals } from '@/proposals/hooks/useProposals'

import { ProposalsTabs } from './components/ProposalsTabs'

export const PastProposals = () => {
  const searchSlot = useRef<HTMLDivElement>(null)
  const [filters, setFilters] = useState(ProposalEmptyFilter)

  const { types, stages } = usePastProposals({ filters })
  const { isLoading, proposals } = useProposals({ status: 'past' })

  const activities = useActivities()

  const sideNeighborRef = useRef<HTMLDivElement>(null)

  return (
    <PageLayout
      header={
        <FilterPageHeader ref={searchSlot} title="Proposals">
          <AddProposalButton />
          <ProposalsTabs />
        </FilterPageHeader>
      }
      main={
        <MainPanel ref={sideNeighborRef}>
          <ProposalFilters searchSlot={searchSlot} types={types} stages={stages} onApply={setFilters} />
          {isLoading ? <Loading /> : <ProposalList proposals={proposals} isPast />}
        </MainPanel>
      }
      lowSidebar={
        <SidePanel neighbor={sideNeighborRef}>
          <ActivitiesBlock activities={activities} label="Proposals Activities" />
        </SidePanel>
      }
    />
  )
}
