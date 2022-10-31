import React from 'react'

import { VoteDisplay } from '@/proposals/constants'
import { useProposalConstants } from '@/proposals/hooks/useProposalConstants'
import { useProposalVotesByMember } from '@/proposals/hooks/useProposalVotesByMember'
import { Proposal, ProposalVote } from '@/proposals/types'

import { VoteForProposalButton } from '../VoteForProposalButton'
import { getVoteStatusComponent } from '../VoteStatusComponent'

export interface ProposalItemVoteDetailsProps {
  proposal: Proposal
  memberId?: string
  isCouncilMember?: boolean
}

export const ProposalItemVoteDetails = ({ proposal, memberId, isCouncilMember }: ProposalItemVoteDetailsProps) => {
  const { votes } = useProposalVotesByMember(proposal.id, memberId)
  const constants = useProposalConstants(proposal.type)
  const constitutionality = constants?.constitutionality
  const canVote =
    isCouncilMember &&
    proposal.status === 'deciding' &&
    (!votes || !votes.some((vote) => proposal.councilApprovals < vote.votingRound))

  return (
    <>
      {canVote && (
        <span>
          {(constitutionality ?? 0) > 1 && `${proposal.councilApprovals + 1}/${constitutionality} `}
          <VoteForProposalButton id={proposal.id}>Vote</VoteForProposalButton>
        </span>
      )}
      {votes?.map(getVoteDisplay(constitutionality))}
    </>
  )
}

const getVoteDisplay = (constitutionality?: number) => (vote: ProposalVote, index: number) =>
  (
    <VoteDisplay key={index}>
      {(constitutionality ?? 0) > 1 && `${vote.votingRound}/${constitutionality} `}
      {getVoteStatusComponent(vote.voteKind)}
    </VoteDisplay>
  )
