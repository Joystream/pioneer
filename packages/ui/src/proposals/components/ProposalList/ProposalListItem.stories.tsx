import { Meta, Story } from '@storybook/react'
import React from 'react'

import { seedProposals } from '../../../mocks/data/seedProposals'

import { ProposalListItem } from './ProposalListItem'

export default {
  title: 'Proposals/ProposalListItem',
  component: ProposalListItem,
} as Meta

type Props = Parameters<typeof ProposalListItem>[0]
const Template: Story<Props> = (args) => <ProposalListItem {...args} />

export const Default = Template.bind({})
Default.args = seedProposals[0]
