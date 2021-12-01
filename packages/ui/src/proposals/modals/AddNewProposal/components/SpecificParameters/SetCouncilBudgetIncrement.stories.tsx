import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { SetCouncilBudgetIncrement } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetCouncilBudgetIncrement'

export default {
  title: 'Proposals/AddNewProposalModal/SetCouncilBudgetIncrement',
  component: SetCouncilBudgetIncrement,
} as Meta

const Template: Story = () => {
  const [amount, setAmount] = useState<BN>()

  return (
    <MockApolloProvider members workingGroups workers>
      <SetCouncilBudgetIncrement setAmount={setAmount} amount={amount} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
