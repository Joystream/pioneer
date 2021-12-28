import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { BountyListItem } from '@/bounty/components/BountyListItem/BountyListItem'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { getMember } from '../../../../test/_mocks/members'

export default {
  title: 'Bounty/BountyListItem',
  component: BountyListItem,
} as Meta

const Template: Story = (args) => {
  const funding = {
    minAmount: new BN(10000),
    maxAmount: new BN(12000),
    maxPeriod: 200,
  }

  return (
    <MemoryRouter>
      <MockApolloProvider workingGroups members workers>
        <BountyListItem
          id="1"
          title="Title"
          createdAt={'2021-12-30'}
          cherry={new BN(1010)}
          entrantStake={new BN(2000)}
          creator={getMember('alice')}
          oracle={getMember('bob')}
          fundingType={funding}
          workPeriod={new BN(1000)}
          judgingPeriod={new BN(1000)}
          stage="funding"
          totalFunding={new BN(2000)}
        />
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {
  stage: 'funding',
  title: 'Title',
  date: new Date(),
}
