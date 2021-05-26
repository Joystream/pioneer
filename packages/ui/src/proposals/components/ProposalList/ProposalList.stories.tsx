import { Meta, Story } from '@storybook/react'
import React from 'react'

import { mockPastProposals, mockProposals } from '@/mocks/data/mockProposals'

import { ProposalList, ProposalListProps } from '.'

export default {
  title: 'Proposals/ProposalList',
  component: ProposalList,
} as Meta

const Template: Story<ProposalListProps> = (args) => <ProposalList {...args} />

export const Default = Template.bind({})
Default.args = { proposals: mockProposals }

export const Past = Template.bind({})
Past.args = { proposals: mockPastProposals, isPast: true }
