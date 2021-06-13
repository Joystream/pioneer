import { Meta, Story } from '@storybook/react'
import React from 'react'

import { mockPastProposals, seedProposals } from '../../../mocks/data/seedProposals'

import { ProposalList, ProposalListProps } from '.'

export default {
  title: 'Proposals/ProposalList',
  component: ProposalList,
} as Meta

const Template: Story<ProposalListProps> = (args) => <ProposalList {...args} />

export const Default = Template.bind({})
Default.args = { proposals: seedProposals }

export const Past = Template.bind({})
Past.args = { proposals: mockPastProposals, isPast: true }
