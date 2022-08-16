import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

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
    <MockApolloProvider workingGroups members workers>
      <BountyListItem {...args} />
    </MockApolloProvider>
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
    maxPeriod: 2000,
  },
  workPeriod: 1000,
  judgingPeriod: 1000,
  stage: 'funding',
  totalFunding: new BN(2000),
  entries: [
    {
      worker: getMember('alice'),
      winner: true,
      hasSubmitted: true,
      passed: false,
      id: '1',
      bountyId: '0',
      status: 'BountyEntryStatusWorking',
      stake: new BN(10),
      rejected: false,
      works: [],
      withdrawn: false,
      hasCashedOut: false,
    },
  ],
}
