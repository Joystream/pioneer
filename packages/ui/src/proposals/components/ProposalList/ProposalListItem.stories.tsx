import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { getMember } from '../../../../test/_mocks/members'

import { ProposalListItem } from './ProposalListItem'

export default {
  title: 'Proposals/ProposalListItem',
  component: ProposalListItem,
} as Meta

type Props = Parameters<typeof ProposalListItem>[0]
const Template: Story<Props> = (args) => (
  <MemoryRouter>
    <ProposalListItem {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  proposal: {
    createdAt: '2021-06-11T16:26:04.129Z',
    type: 'setWorkingGroupLeadReward',
    id: '0',
    proposer: getMember('alice'),
    status: 'deciding',
    title: 'firewall Stand-alone set Checking',
    councilApprovals: 0,
  },
}
