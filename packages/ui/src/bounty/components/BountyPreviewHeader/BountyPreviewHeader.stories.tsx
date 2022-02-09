import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BountyPreviewHeader } from '@/bounty/components/BountyPreviewHeader/BountyPreviewHeader'
import bountyRaw from '@/mocks/data/raw/bounties.json'

export default {
  title: 'Bounty/BountyPreviewHeader',
  component: BountyPreviewHeader,
} as Meta

const Template: Story = (args) => {
  return <BountyPreviewHeader bounty={bountyRaw[1] as any} {...args} />
}

export const Default = Template.bind({})
Default.args = {
  badgeNames: ['GOVERNANCE BUDGET', 'ELECTION #6'],
}
