import { Meta, Story } from '@storybook/react'
import React from 'react'

import { WorkingDetailsStep } from '@/bounty/modals/AddBountyModal/components/WorkingDetailsStep'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'bounty/AddBountyModal/WorkingDetailsStep',
  component: WorkingDetailsStep,
} as Meta

const WorkingDetailsStepTemplate: Story = () => {
  return (
    <MockApolloProvider members>
      <WorkingDetailsStep errorChecker={() => false} errorMessageGetter={() => undefined} />
    </MockApolloProvider>
  )
}

export const Default = WorkingDetailsStepTemplate.bind({})
