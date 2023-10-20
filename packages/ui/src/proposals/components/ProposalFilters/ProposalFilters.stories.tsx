import { Meta, Story } from '@storybook/react'
import { addMonths, startOfToday } from 'date-fns'
import React, { useRef } from 'react'

import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { proposalDetails } from '@/proposals/model/proposalDetails'
import { proposalStatuses } from '@/proposals/model/proposalStatus'

import { ProposalFilters, ProposalFiltersProps } from '.'

export default {
  title: 'Pages/Proposals/ProposalList/Past/Components/ProposalFilters',
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
    <MockApolloProvider members>
      <FilterPageHeader ref={searchSlot} title="Proposal" />
      <ProposalFilters
        {...props}
        searchSlot={searchSlot}
        types={proposalDetails}
        withinDates={withinDates}
        stages={proposalStatuses}
      />
    </MockApolloProvider>
  )
}

Default.args = {}
