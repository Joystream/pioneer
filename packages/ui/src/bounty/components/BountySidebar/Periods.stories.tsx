import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { Periods, PeriodsProps } from './Periods'

export default {
  title: 'Bounty/Periods',
  component: Periods,
  argTypes: {
    stage: {
      options: ['funding', 'working', 'judgement'],
      control: { type: 'radio' },
    },
  },
} as Meta

const Template: Story<PeriodsProps> = (args) => (
  <MemoryRouter>
    <MockApolloProvider>
      <Periods {...args} />
    </MockApolloProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  stage: 'judgement',
  workPeriodLength: 10000,
  judgingPeriodLength: 1200,
}
