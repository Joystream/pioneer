import { Meta, Story } from '@storybook/react'
import React from 'react'

import { JudgingDetailsStep } from '@/bounty/modals/AddBountyModal/components/JudgingDetailsStep'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'bounty/AddBountyModal/JudgingDetailsStep',
  component: JudgingDetailsStep,
} as Meta

const JudgingDetailsStepTemplate: Story = () => {
  return (
    <MockApolloProvider members>
      <JudgingDetailsStep />
    </MockApolloProvider>
  )
}

export const Default = JudgingDetailsStepTemplate.bind({})
