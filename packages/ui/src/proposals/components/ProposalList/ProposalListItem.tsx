import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { TableListItem } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Subscription } from '@/common/components/typography/Subscription'
import { TextSmall } from '@/common/components/typography/Text'
import { Colors, Overflow } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { MemberInfo } from '@/memberships/components'
import { ProposalColLayout } from '@/proposals/constants'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { useProposalConstants } from '@/proposals/hooks/useProposalConstants'
import { useProposalVotesByMember } from '@/proposals/hooks/useProposalVotesByMember'
import { isProposalActive } from '@/proposals/model/proposalStatus'
import { Proposal, ProposalVote } from '@/proposals/types'
import {
  ToggleableItemInfo,
  ToggleableItemInfoTop,
  ToggleableItemTitle,
} from '@/working-groups/components/ToggleableItemStyledComponents'

import { VoteForProposalButton } from '../VoteForProposalButton'

export interface ProposalListItemProps {
  proposal: Proposal
  isPast?: boolean
  memberId?: string
  isCouncilMember?: boolean
}

export const ProposalListItem = ({ proposal, isPast, memberId, isCouncilMember }: ProposalListItemProps) => {
  const { api } = useApi()
  const voteStatus = useObservable(
    memberId
      ? api?.query.proposalsEngine.voteExistsByProposalByVoter(parseInt(proposal.id), parseInt(memberId))
      : undefined,
    [memberId]
  )
  const { votes, isLoading } = useProposalVotesByMember(proposal.id, memberId)
  const constants = useProposalConstants(proposal.type)
  const constitutionality = constants?.constitutionality
  const date = new Date(!isProposalActive(proposal.status) ? (proposal.endedAt as string) : proposal.createdAt)
  const hasVoted = voteStatus?.isApprove || voteStatus?.isAbstain || voteStatus?.isReject || voteStatus?.isSlash
  const canVote = isCouncilMember && proposal.status === 'deciding' && voteStatus && !hasVoted
  return (
    <ProposalItem
      as={GhostRouterLink}
      to={`${ProposalsRoutes.preview}/${proposal.id}`}
      $colLayout={ProposalColLayout}
      $isPast={!isProposalActive(proposal.status)}
    >
      <ToggleableItemInfo>
        <ToggleableItemInfoTop>
          <Subscription>
            {isPast ? 'Ended:' : 'Created:'} {date.toLocaleDateString('en-GB')}
          </Subscription>
          <BadgeStatus>{camelCaseToText(proposal.type)}</BadgeStatus>
        </ToggleableItemInfoTop>
        <ToggleableItemTitle>{proposal.title}</ToggleableItemTitle>
      </ToggleableItemInfo>
      <StageField>
        <TextSmall bold>{camelCaseToText(proposal.status)}</TextSmall>
        <Tooltip tooltipText="Lorem ipsum, dolor sit amet consectetur">
          <TooltipDefault />
        </Tooltip>
      </StageField>
      <MemberInfo member={proposal.proposer} memberSize="s" showIdOrText />
      <StageField>
        {canVote && (
          <span>
            {(constitutionality ?? 0) > 1 && `${proposal.councilApprovals + 1}/${constitutionality} `}
            <VoteForProposalButton id={proposal.id} />
          </span>
        )}
        {isLoading ? <Loading /> : votes?.map(getVoteDisplay(constitutionality))}
      </StageField>
    </ProposalItem>
  )
}

const getVoteDisplay = (constitutionality?: number) => (vote: ProposalVote) => (
  <span>
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

const ProposalItem = styled(TableListItem)`
  grid-column-gap: 36px;
  padding-right: 16px;
  background-color: ${({ $isPast }: { $isPast?: boolean }) => ($isPast ? Colors.Black[50] : Colors.White)};
  grid-template-rows: unset;
  height: 86px;
`

const StageField = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  width: fit-content;
  max-width: 100%;

  ${TextSmall} {
    ${Overflow.FullDots};
  }
`
