import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { FundingDetailsStep } from './FundingDetailsStep'

export default {
  title: 'bounty/AddBountyModal/FundingDetailsStep',
  component: FundingDetailsStep,
} as Meta

const FundingDetailsTemplate: Story = () => {
  return (
    <MockApolloProvider members>
      <FundingDetailsStep minCherryLimit={10} errorChecker={() => false} errorMessageGetter={() => undefined} />
    </MockApolloProvider>
  )
}

export const Default = FundingDetailsTemplate.bind({})
