import React from 'react'
import styled from 'styled-components'

import { ProposalVoteKind } from '@/common/api/queries'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { BorderRad, Colors } from '@/common/constants'
import { ProposalVotes } from '@/proposals/hooks/useProposalVotes'

import { VotePreview } from './VotePreview'

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

interface VotesPreviewProps {
  votes: ProposalVotes
}

export const VotesPreview = ({ votes }: VotesPreviewProps) => (
  <VotesContainer>
    <VotePreview kind={Approve} count={votes.count.approve} votes={votes.map.get(Approve)} />
    <VotePreview kind={Reject} count={votes.count.reject} votes={votes.map.get(Reject)} />
    <VotePreview kind={Slash} count={votes.count.slash} votes={votes.map.get(Slash)} />
    <VotePreview kind={Abstain} count={votes.count.abstain} votes={votes.map.get(Abstain)} />
    <VotePreview kind="Not Voted" count={votes.count.remain} />
  </VotesContainer>
)

const VotesContainer = styled(RowGapBlock).attrs({ gap: 8 })`
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
`
