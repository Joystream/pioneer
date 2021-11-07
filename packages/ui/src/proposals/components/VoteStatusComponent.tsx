import React, { ReactNode } from 'react'

import { ProposalVoteKind } from '@/common/api/queries'
import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { VoteStatus } from '@/proposals/constants'

import { ProposalVote } from '../types'

const voteStatusMap: Record<ProposalVote['voteKind'], ReactNode> = {
  ABSTAIN: <VoteStatus>Abstained</VoteStatus>,
  APPROVE: (
    <VoteStatus>
      <CheckboxIcon />
      Approved
    </VoteStatus>
  ),
  REJECT: (
    <VoteStatus>
      <CrossIcon />
      Rejected
    </VoteStatus>
  ),
  SLASH: (
    <VoteStatus>
      <CrossIcon />
      Slashed
    </VoteStatus>
  ),
}

interface Props {
  voteKind: ProposalVoteKind
}
export const VoteStatusComponent = ({ voteKind }: Props) => <>{voteStatusMap[voteKind]}</>
export const getVoteStatusComponent = (voteKind: ProposalVoteKind) => voteStatusMap[voteKind]
