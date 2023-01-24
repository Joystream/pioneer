import { Meta, Story } from '@storybook/react'
import React from 'react'

import { AddNewProposalTemplate } from '@/proposals/components/StorybookTemplates'

import { ChannelIncentivesPayout } from './ChannelIncentivesPayout'

export default {
  title: 'Proposals/AddNewProposalModal/ChannelIncentivesPayout',
  component: ChannelIncentivesPayout,
} as Meta

const Template: Story = () => (
  <AddNewProposalTemplate title="Channel Update Payout">
    <ChannelIncentivesPayout />
  </AddNewProposalTemplate>
)

export const Default = Template.bind({})
