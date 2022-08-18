import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMember } from '@/mocks/helpers'

import { BountySidebar, BountySidebarProps } from './BountySidebar'

export default {
  title: 'Bounty/BountySidebar',
  component: BountySidebar,
  argTypes: {
    stage: {
      options: ['funding', 'working', 'judgement'],
      control: { type: 'radio' },
    },
    entrantResult: {
      options: ['winner', 'loser', 'slashed'],
      control: { type: 'radio' },
    },
  },
} as Meta

const Template: Story<BountySidebarProps> = (args) => (
  <MockApolloProvider>
    <BountySidebar {...args} />
  </MockApolloProvider>
)

export const Default = Template.bind({})
Default.args = {
  contributors: [
    { actor: getMember('alice'), amount: new BN(1000), hasWithdrawn: false },
    { actor: getMember('bob'), amount: new BN(7500), hasWithdrawn: false },
  ],
  entrants: [
    { actor: getMember('alice'), count: 2 },
    { actor: getMember('bob'), count: 1 },
  ],
  withdrawals: [{ actor: getMember('alice') }, { actor: getMember('bob') }],
  entrantResult: 'winner',
  stage: 'funding',
  periodsLengths: {
    workPeriodLength: 200,
    judgingPeriodLength: 125,
  },
}
