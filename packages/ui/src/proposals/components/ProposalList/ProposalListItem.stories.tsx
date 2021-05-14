import { Meta, Story } from '@storybook/react'
import React from 'react'

import { asMember } from '@/memberships/types'
import { mockMembers } from '@/mocks/data/mockMembers'
import { ProposalStages, ProposalTypes } from '@/proposals/constants'
import { Proposal } from '@/proposals/types'

import { ProposalListItem } from './ProposalListItem'

export default {
  title: 'Proposals/ProposalListItem',
  component: ProposalListItem,
} as Meta

type Props = Parameters<typeof ProposalListItem>[0]
const Template: Story<Props> = (args) => <ProposalListItem {...args} />

export const Default = Template.bind({})
Default.args = {
  id: '1',
  createdAt: '2021-03-29 18:21:06.000000',
  stage: Object.keys(ProposalStages)[0] as Proposal['stage'],
  type: Object.keys(ProposalTypes)[0] as Proposal['type'],
  proposer: asMember((mockMembers[0] as unknown) as any),
}
