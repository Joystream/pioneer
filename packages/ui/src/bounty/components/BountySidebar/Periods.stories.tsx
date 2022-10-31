import { Meta, Story } from '@storybook/react'
import React from 'react'

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
  <MockApolloProvider>
    <Periods {...args} />
  </MockApolloProvider>
)

export const Default = Template.bind({})
Default.args = {
  stage: 'judgement',
  periodsLengths: {
    workPeriodLength: 10000,
    judgingPeriodLength: 1200,
  },
}
