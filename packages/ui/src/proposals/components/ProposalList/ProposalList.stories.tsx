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
  proposals: Array<Omit<Proposal, 'id' | 'stage'>>(4)
    .fill({
      createdAt: '2021-03-29 18:21:06.000000',
      title: 'Lorem ipsum, dolor sit amet consectetur',
      rationale: 'Voluptatem id voluptatibus aspernatur quibusdam hic porro. Labore, eligendi tempore?',
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
