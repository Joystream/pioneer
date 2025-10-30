import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { CancelWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CancelWorkingGroupLeadOpening'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/CancelWorkingGroupLeadOpening',
  component: CancelWorkingGroupLeadOpening,
} as Meta

const CancelWorkingGroupLeadOpeningTemplate: Story = () => {
  return (
    <MockApolloProvider members workingGroups>
      <CancelWorkingGroupLeadOpening />
    </MockApolloProvider>
  )
}

export const Default = CancelWorkingGroupLeadOpeningTemplate.bind({})
