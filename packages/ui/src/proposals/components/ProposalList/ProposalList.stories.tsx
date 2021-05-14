import { Meta, Story } from '@storybook/react'
import React from 'react'

import { asMember } from '@/memberships/types'
import { mockMembers } from '@/mocks/data/mockMembers'
import { Proposal, ProposalStage } from '@/proposals/types'

import { ProposalList } from '.'

export default {
  title: 'Proposals/ProposalList',
  component: ProposalList,
} as Meta

type Props = Parameters<typeof ProposalList>[0]
const Template: Story<Props> = (args) => <ProposalList {...args} />

export const Default = Template.bind({})
Default.args = {
  proposals: Array<Pick<Proposal, 'createdAt' | 'type' | 'proposer'>>(4)
    .fill({
      createdAt: '2021-03-29 18:21:06.000000',
      type: 'Founding request',
      proposer: asMember((mockMembers[0] as unknown) as any),
    })
    .map(
      (proposal, index): Proposal => ({
        ...proposal,
        id: String(index),
        stage: (['DECIDING', 'DORMANT', 'GRACING', 'SUCCEDED'] as ProposalStage[])[index],
      })
    ),
}
