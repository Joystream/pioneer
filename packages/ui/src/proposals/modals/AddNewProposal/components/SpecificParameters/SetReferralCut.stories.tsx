import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { SetReferralCut } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetReferralCut'

export default {
  title: 'Proposals/AddNewProposalModal/SetReferralCut',
  component: SetReferralCut,
} as Meta

const Template: Story = () => {
  const [amount, setAmount] = useState(0)

  return (
    <MockApolloProvider>
      <SetReferralCut setReferralCut={setAmount} referralCut={amount} setIsExecutionError={() => undefined} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
