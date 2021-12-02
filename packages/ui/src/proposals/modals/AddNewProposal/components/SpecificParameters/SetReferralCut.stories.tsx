import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { BN_ZERO } from '@/common/constants'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { SetReferralCut } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetReferralCut'

export default {
  title: 'Proposals/AddNewProposalModal/SetReferralCut',
  component: SetReferralCut,
} as Meta

const Template: Story = () => {
  const [amount, setAmount] = useState(BN_ZERO)

  return (
    <MockApolloProvider>
      <SetReferralCut setAmount={setAmount} amount={amount} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
