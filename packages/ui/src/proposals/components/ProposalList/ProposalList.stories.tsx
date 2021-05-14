import { Meta, Story } from '@storybook/react'
import React from 'react'

import { mockMembers } from '@/mocks/data/mockMembers'
import { ProposalStages, ProposalTypes } from '@/proposals/constants'

import { ProposalList } from '.'

export default {
  title: 'Proposals/ProposalList',
  component: ProposalList,
} as Meta

type Props = Parameters<typeof ProposalList>[0]
const Template: Story<Props> = (args) => <ProposalList {...args} />

export const Default = Template.bind({})
Default.args = {
  proposals: Array(4)
    .fill({
      createdAt: '2021-03-29 18:21:06.000000',
      type: Object.keys(ProposalTypes)[0],
      proposer: mockMembers[0],
    })
    .map((proposal, index) => ({ ...proposal, id: index, stage: Object.keys(ProposalStages)[index] })),
}
