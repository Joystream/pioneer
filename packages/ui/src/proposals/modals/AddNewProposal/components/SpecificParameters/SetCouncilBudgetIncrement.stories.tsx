import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { SetCouncilBudgetIncrement } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetCouncilBudgetIncrement'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/SetCouncilBudgetIncrement',
  component: SetCouncilBudgetIncrement,
} as Meta

const Template: Story = () => {
  return (
    <MockApolloProvider members workingGroups workers>
      <SetCouncilBudgetIncrement />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
