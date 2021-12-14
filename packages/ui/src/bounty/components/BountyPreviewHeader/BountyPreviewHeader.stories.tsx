import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BountyPreviewHeader } from '@/bounty/components/BountyPreviewHeader/BountyPreviewHeader'

export default {
  title: 'Bounty/BountyPreviewHeader',
  component: BountyPreviewHeader,
} as Meta

const Template: Story = (args) => {
  return <BountyPreviewHeader type="funding" {...args} />
}

export const Default = Template.bind({})
Default.args = {
  type: 'funding',
}
