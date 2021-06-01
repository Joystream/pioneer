import React, { useRef, useState } from 'react'

import { AppPage } from '@/app/components/AppPage'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { useActivities } from '@/common/hooks/useActivities'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { ProposalEmptyFilter, ProposalFilters } from '@/proposals/components/ProposalFilters'
import { ProposalList } from '@/proposals/components/ProposalList'
import { usePastProposals } from '@/proposals/hooks/usePastProposals'

import { ProposalsTabs } from './components/ProposalsTabs'

export const PastProposals = () => {
  const searchSlot = useRef<HTMLDivElement>(null)
  const [filters, setFilters] = useState(ProposalEmptyFilter)

  const { proposals, types, stages, proposers, isLoading } = usePastProposals({ filters })
  const activities = useActivities()

  const sideNeighborRef = useRef<HTMLDivElement>(null)

  return (
    <AppPage>
      <FilterPageHeader ref={searchSlot} title="Proposals">
        <AddProposalButton />
        <ProposalsTabs />
      </FilterPageHeader>

      <ContentWithSidepanel>
        <MainPanel ref={sideNeighborRef}>
          <ProposalFilters
            searchSlot={searchSlot}
            types={types}
            stages={stages}
            proposers={proposers}
            onApply={setFilters}
          />
          {isLoading ? <Loading /> : <ProposalList proposals={proposals} isPast />}
        </MainPanel>
        <SidePanel neighbor={sideNeighborRef}>
          <ActivitiesBlock activities={activities} label="Proposals Activities" />
        </SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}
