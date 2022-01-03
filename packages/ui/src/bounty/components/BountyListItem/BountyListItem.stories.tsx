import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { BountyListItem } from '@/bounty/components/BountyListItem/BountyListItem'
import { Bounty } from '@/bounty/types/Bounty'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { getMember } from '../../../../test/_mocks/members'

export default {
  title: 'Bounty/BountyListItem',
  component: BountyListItem,
  argTypes: {
    stage: {
      options: ['funding', 'working', 'judgement', 'withdrawal', 'expired'],
      control: { type: 'radio' },
    },
  },
} as Meta

const Template: Story<Bounty> = (args) => {
  return (
    <MemoryRouter>
      <MockApolloProvider workingGroups members workers>
        <BountyListItem {...args} />
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {
  id: '1',
  createdAt: '2021-12-31',
  title: 'Title',
  cherry: new BN(1010),
  entrantStake: new BN(10000),
  creator: getMember('alice'),
  oracle: getMember('bob'),
  fundingType: {
    minAmount: new BN(10000),
    maxAmount: new BN(12000),
    maxPeriod: new BN(2000),
  },
  workPeriod: new BN(1000),
  judgingPeriod: new BN(1000),
  stage: 'funding',
  totalFunding: new BN(2000),
  entries: [
    { worker: getMember('alice') },
    { worker: getMember('bob') },
    { worker: getMember('alice') },
    { worker: getMember('bob'), winner: true },
  ],
}
