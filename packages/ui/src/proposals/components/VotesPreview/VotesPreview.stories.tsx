import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ProposalVoteKind } from '@/common/api/queries'
import { SideBar, voteControl } from '@/common/components/storybookParts/previewStyles'
import { countVoteMap, VoteMap } from '@/proposals/hooks/useProposalVotes'
import { asProposalVote, ProposalVote } from '@/proposals/types'

import { VotesPreview } from './VotesPreview'

export default {
  title: 'Proposals/ProposalPreview/VotesPreview',
  component: VotesPreview,
  argTypes: {
    approve: voteControl,
    reject: voteControl,
    slash: voteControl,
    councilSize: { control: { type: 'range', min: 0, max: 30 } },
  },
} as Meta

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

interface Args {
  approve: number
  reject: number
  slash: number
  abstain: number
  councilSize: number
}

export const Default: Story<Args> = ({ approve = 0, reject = 0, slash = 0, abstain = 0, councilSize }) => {
  const lengths: [ProposalVoteKind, number][] = [
    [Approve, approve],
    [Reject, reject],
    [Slash, slash],
    [Abstain, abstain],
  ]

  const map: VoteMap = new Map(
    lengths.map(([voteKind, length]) => {
      const votes = Array.from<ProposalVote>({ length }).fill(asProposalVote({ voteKind }))
      return [voteKind, votes]
    })
  )

  const count = countVoteMap(map, approve + slash + reject + abstain, councilSize || undefined)

  return (
    <MemoryRouter>
      <SideBar>
        <VotesPreview votes={{ map, count }} />
      </SideBar>
    </MemoryRouter>
  )
}

Default.args = {
  approve: 2,
  reject: 2,
  slash: 0,
  councilSize: 10,
}
