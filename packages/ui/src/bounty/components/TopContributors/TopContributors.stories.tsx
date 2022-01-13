import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TopContributors } from '@/bounty/components/TopContributors/TopContributors'
import members from '@/mocks/data/raw/members.json'
import BN from 'bn.js'

export default {
  title: 'Bounty/TopContributors',
  component: TopContributors,
} as Meta

const Template: Story = (args) => <TopContributors contributions={args.contributors} />

export const Default = Template.bind({})
Default.args = {
  contributors: members.slice(0, 20).map((member) => ({ contributor: member, amount: new BN(10000) })),
}

export const NoContributors = Template.bind({})
NoContributors.args = {
  contributors: undefined,
}
