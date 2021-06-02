import { Meta, Story } from '@storybook/react'
import { addMonths, startOfToday } from 'date-fns'
import React, { useRef } from 'react'

import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { Member } from '@/memberships/types'
import { mockMembers } from '@/mocks/data'
import { proposalStages, proposalTypes } from '@/mocks/data/mockProposals'

import { ProposalFilters, ProposalFiltersProps } from '.'

const proposers = (mockMembers.slice(0, 10) as unknown) as Member[]

export default {
  title: 'Proposals/ProposalFilters',
  component: ProposalFilters,
  argTypes: {
    onApply: { action: 'Apply' },
  },
} as Meta

export const Default: Story<Pick<ProposalFiltersProps, 'onApply'>> = (props) => {
  const searchSlot = useRef<HTMLDivElement>(null)

  const today = startOfToday()
  const withinDates = { start: addMonths(today, -13), end: today }

  return (
    <>
      <FilterPageHeader ref={searchSlot} title="Proposal" />
      <ProposalFilters
        {...props}
        searchSlot={searchSlot}
        types={proposalTypes}
        withinDates={withinDates}
        proposers={proposers}
        stages={proposalStages}
      />
    </>
  )
}

Default.args = {}
