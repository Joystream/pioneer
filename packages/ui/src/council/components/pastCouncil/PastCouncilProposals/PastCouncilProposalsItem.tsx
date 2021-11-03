import React from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { ArrowRightIcon } from '@/common/components/icons'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { Sizes } from '@/common/constants'
import { camelCaseToText, capitalizeFirstLetter } from '@/common/helpers'
import { toDDMMYY } from '@/common/utils/dates'
import { PastCouncilMemberProposalsLayout } from '@/council/components/pastCouncil/PastCouncilMembers/PastCouncilMembersItem'
import { PastCouncilProposalsLayout } from '@/council/components/pastCouncil/PastCouncilProposals/PastCouncilProposals'
import { MemberInfo } from '@/memberships/components'
import { StageField } from '@/proposals/components/ProposalList/ProposalListItem'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { VoteStatus } from '@/proposals/modals/VoteForProposal/machine'
import { isProposalActive } from '@/proposals/model/proposalStatus'
import { Proposal } from '@/proposals/types'
import {
  ToggleableItemInfo,
  ToggleableItemInfoTop,
  ToggleableItemTitle,
} from '@/working-groups/components/ToggleableItemStyledComponents'

interface Props {
  proposal: Proposal
  vote?: VoteStatus
}

export const PastCouncilProposalsItem = ({ proposal, vote }: Props) => {
  const displayDate = new Date(!isProposalActive(proposal.status) ? (proposal.endedAt as string) : proposal.createdAt)

  return (
    <PastCouncilProposalWrap vote={vote}>
      <ToggleableItemInfo>
        <ToggleableItemInfoTop>
          <Subscription>
            {!isProposalActive(proposal.status) ? 'Ended at:' : 'Created at:'} {toDDMMYY(displayDate)}
          </Subscription>
          <BadgeStatus>{camelCaseToText(proposal.type)}</BadgeStatus>
        </ToggleableItemInfoTop>
        <ToggleableItemTitle>{proposal.title}</ToggleableItemTitle>
      </ToggleableItemInfo>
      <StageField>
        <TextMedium bold>{camelCaseToText(proposal.status)}</TextMedium>
        <Tooltip tooltipText="Lorem ipsum, dolor sit amet consectetur">
          <TooltipDefault />
        </Tooltip>
      </StageField>
      <MemberInfo member={proposal.proposer} memberSize="s" />
      {vote && <TextMedium bold>{capitalizeFirstLetter(vote)}</TextMedium>}
      <LinkButtonGhost to={generatePath(ProposalsRoutes.preview, { id: proposal.id })} size="medium">
        Go to proposal <ArrowRightIcon />
      </LinkButtonGhost>
    </PastCouncilProposalWrap>
  )
}

export const PastCouncilProposalWrap = styled.div<{ vote?: VoteStatus }>`
  display: grid;
  grid-template-columns: ${({ vote }) => (vote ? PastCouncilMemberProposalsLayout : PastCouncilProposalsLayout)};
  grid-template-rows: 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px;
  margin-left: -1px;

  > *:last-child {
    justify-self: end;
  }
`
