import { Meta, Story } from '@storybook/react'
import React from 'react'

import { AddNewProposalTemplate } from '@/proposals/components/StorybookTemplates'

import { UpdateChannelPayouts } from './UpdateChannelPayouts'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/UpdateChannelPayouts',
  component: UpdateChannelPayouts,
} as Meta

const Template: Story = () => (
  <AddNewProposalTemplate title="Channel Update Payout">
    <UpdateChannelPayouts />
  </AddNewProposalTemplate>
)

export const Default = Template.bind({})
