import { Meta, Story } from '@storybook/react'
import React from 'react'

import { asMember } from '@/memberships/types'
import { mockMembers } from '@/mocks/data/mockMembers'

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
  title: 'Lorem ipsum, dolor sit amet consectetur',
  rationale: 'Voluptatem id voluptatibus aspernatur quibusdam hic porro. Labore, eligendi tempore?',
  stage: 'DECIDING',
  type: 'Founding request',
  proposer: asMember((mockMembers[0] as unknown) as any),
}
