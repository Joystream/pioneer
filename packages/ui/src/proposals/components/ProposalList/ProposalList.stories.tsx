import { Meta, Story } from '@storybook/react'
import React from 'react'

import { mockProposals } from '@/mocks/data/mockProposals'

import { ProposalList, ProposalListProps } from '.'

export default {
  title: 'Proposals/ProposalList',
  component: ProposalList,
} as Meta

const Template: Story<ProposalListProps> = (args) => <ProposalList {...args} />

export const Default = Template.bind({})
Default.args = { proposals: mockProposals }
