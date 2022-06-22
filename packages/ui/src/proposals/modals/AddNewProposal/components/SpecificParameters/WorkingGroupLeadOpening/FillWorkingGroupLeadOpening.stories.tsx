import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { FillWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/FillWorkingGroupLeadOpening'

export default {
  title: 'Proposals/AddNewProposalModal/FillWorkingGroupLeadOpening',
  component: FillWorkingGroupLeadOpening,
} as Meta

const FillWorkingGroupLeadOpeningTemplate: Story = () => {
  return (
    <MockApolloProvider members workingGroups>
      <FillWorkingGroupLeadOpening />
    </MockApolloProvider>
  )
}

export const Default = FillWorkingGroupLeadOpeningTemplate.bind({})
