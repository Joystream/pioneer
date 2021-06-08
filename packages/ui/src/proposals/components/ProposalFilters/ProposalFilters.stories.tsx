import { Meta, Story } from '@storybook/react'
import { addMonths, startOfToday } from 'date-fns'
import React, { useRef } from 'react'

import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { Member } from '@/memberships/types'
import { mockMembers } from '@/mocks/data'
import { proposalStages, proposalTypes } from '@/mocks/data/mockProposals'

import { ProposalFilters, ProposalFiltersState } from '.'

const proposers = (mockMembers.slice(0, 10) as unknown) as Member[]

export default {
  title: 'Proposals/ProposalFilters',
  component: ProposalFilters,
} as Meta

export const Default: Story = () => {
  const searchSlot = useRef<HTMLDivElement>(null)

  const today = startOfToday()
  const withinDates = { start: addMonths(today, -13), end: today }

  const display = (dates: ProposalFiltersState) =>
    setTimeout(() => {
      alert(JSON.stringify(dates, null, 2))
    }, 100)

  return (
    <>
      <FilterPageHeader ref={searchSlot} title="Proposal" />
      <ProposalFilters
        searchSlot={searchSlot}
        types={proposalTypes}
        withinDates={withinDates}
        proposers={proposers}
        stages={proposalStages}
        onApply={display}
      />
    </>
  )
}

Default.args = {}
