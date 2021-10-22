import React, { ReactNode } from 'react'

import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { useProposalConstants } from '@/proposals/hooks/useProposalConstants'
import { useProposalVotesByMember } from '@/proposals/hooks/useProposalVotesByMember'
import { Proposal, ProposalVote } from '@/proposals/types'

import { VoteForProposalButton } from '../VoteForProposalButton'

export interface ProposalItemVoteDetailsProps {
  proposal: Proposal
  memberId?: string
  isCouncilMember?: boolean
}

export const ProposalItemVoteDetails = ({ proposal, memberId, isCouncilMember }: ProposalItemVoteDetailsProps) => {
  const { api } = useApi()
  const voteStatusSize = useObservable(
    memberId
      ? api?.query.proposalsEngine.voteExistsByProposalByVoter.size(parseInt(proposal.id), parseInt(memberId))
      : undefined,
    [memberId]
  )
  const { votes, isLoading } = useProposalVotesByMember(proposal.id, memberId)
  const constants = useProposalConstants(proposal.type)
  const constitutionality = constants?.constitutionality
  const hasVoted = voteStatusSize?.gtn(0)
  const canVote = isCouncilMember && proposal.status === 'deciding' && !hasVoted
  return (
    <>
      {canVote && (
        <span>
          {(constitutionality ?? 0) > 1 && `${proposal.councilApprovals + 1}/${constitutionality} `}
          <VoteForProposalButton id={proposal.id} />
        </span>
      )}
      {isLoading ? <Loading /> : votes?.map(getVoteDisplay(constitutionality))}
    </>
  )
}

const getVoteDisplay = (constitutionality?: number) => (vote: ProposalVote, index: number) => (
  <span key={index}>
    {(constitutionality ?? 0) > 1 && `${vote.votingRound}/${constitutionality} `}
    {voteStatusMap[vote.voteKind]}
  </span>
)

const voteStatusMap: Record<ProposalVote['voteKind'], ReactNode> = {
  ABSTAIN: <span>Abstained</span>,
  APPROVE: (
    <span>
      <CheckboxIcon />
      Approved
    </span>
  ),
  REJECT: (
    <span>
      <CrossIcon />
      Rejected
    </span>
  ),
  SLASH: (
    <span>
      <CrossIcon />
      Slashed
    </span>
  ),
}
