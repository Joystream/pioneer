import { Meta, Story } from '@storybook/react'
import React from 'react'

import { mockProposals } from '@/mocks/data/mockProposals'

import { ProposalListItem } from './ProposalListItem'

export default {
  title: 'Proposals/ProposalListItem',
  component: ProposalListItem,
} as Meta

type Props = Parameters<typeof ProposalListItem>[0]
const Template: Story<Props> = (args) => <ProposalListItem {...args} />

export const Default = Template.bind({})
Default.args = mockProposals[0]
