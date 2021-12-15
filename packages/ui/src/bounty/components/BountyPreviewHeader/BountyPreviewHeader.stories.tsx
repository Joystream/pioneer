import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BountyPreviewHeader } from '@/bounty/components/BountyPreviewHeader/BountyPreviewHeader'

export default {
  title: 'Bounty/BountyPreviewHeader',
  component: BountyPreviewHeader,
} as Meta

const Template: Story = (args) => {
  return <BountyPreviewHeader title="Long title" {...args} />
}

export const Default = Template.bind({})
Default.args = {
  title: 'Long title',
  badgeNames: ['GOVERNANCE BUDGET', 'ELECTION #6'],
  buttons: [
    {
      label: 'Continue',
      type: 'primary',
      onClick: () => undefined,
    },
  ],
}
