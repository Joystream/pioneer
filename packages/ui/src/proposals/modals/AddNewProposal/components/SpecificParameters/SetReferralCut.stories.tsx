import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { SetReferralCut } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetReferralCut'

export default {
  title: 'Proposals/AddNewProposalModal/SetReferralCut',
  component: SetReferralCut,
} as Meta

const Template: Story = () => {
  return (
    <MockApolloProvider>
      <SetReferralCut errorChecker={() => false} errorMessageGetter={() => undefined} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
