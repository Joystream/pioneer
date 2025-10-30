import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { SetReferralCut } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetReferralCut'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/SetReferralCut',
  component: SetReferralCut,
} as Meta

const Template: Story = () => {
  return (
    <MockApolloProvider>
      <SetReferralCut />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
