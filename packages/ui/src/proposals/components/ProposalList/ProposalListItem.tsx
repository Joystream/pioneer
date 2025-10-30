import React from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CopyButtonTemplate } from '@/common/components/buttons'
import { TableListItem } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Subscription } from '@/common/components/typography/Subscription'
import { TextSmall } from '@/common/components/typography/Text'
import { Colors, Overflow } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { toDDMMYY } from '@/common/utils/dates'
import { MemberInfo } from '@/memberships/components'
import { ProposalColLayout } from '@/proposals/constants'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { isProposalActive } from '@/proposals/model/proposalStatus'
import { Proposal } from '@/proposals/types'
import {
  ToggleableItemInfo,
  ToggleableItemInfoTop,
  ToggleableItemTitle,
} from '@/working-groups/components/ToggleableItemStyledComponents'

import { ProposalItemVoteDetails } from './ProposalItemVoteDetails'

export interface ProposalListItemProps {
  proposal: Proposal
  isPast?: boolean
  memberId?: string
  isCouncilMember?: boolean
}

export const ProposalListItem = ({ proposal, isPast, memberId, isCouncilMember }: ProposalListItemProps) => {
  const displayDate = new Date(!isProposalActive(proposal.status) ? (proposal.endedAt as string) : proposal.createdAt)
  const checkStatus = () => {
    switch (proposal.status) {
      case 'deciding':
        return 'Initial stage for all successfully created proposals. This is the only stage where votes submitted can actually impact the outcome. If a new council is elected, any present stake is slashed by rejection fee, the staking lock is removed and the proposal transitions to the rejected stage.'
      case 'dormant':
        return 'Proposal was approved by current council, but requires further approvals to satisfy constitutionality requirement, which is a minimum number of consecutive council votes. Transitions to deciding stage when next council is elected.'
      case 'gracing':
        return 'Proposal was approved by current council, but requires further approvals to satisfy constitutionality requirement, which is a minimum number of consecutive council votes. Transitions to deciding stage when next council is elected.'
      case 'expired':
        return 'This proposal expired, meaning it was not executed due to council not voting on it during its term.'
      case 'vetoed':
        return 'Was halted by SUDO, nothing further can happen. This will be removed at mainnet.'
      case 'slashed':
        return 'Was rejected with full stake penalty by the current council.'
      case 'executed':
        return 'Execution succeeded, nothing further can happen.'
      case 'executionFailed':
        return 'Execution failed due to unsatisfied execution conditions, nothing further can happen.'
      case 'rejected':
        return 'Proposal was rejected by council. Rationale can be checked in proposal details, and nothing further can happen.'
    }
  }

  return (
    <ProposalItem
      as={GhostRouterLink}
      to={generatePath(ProposalsRoutes.preview, { id: proposal.id })}
      $colLayout={ProposalColLayout(isCouncilMember, isPast)}
      $isPast={!isProposalActive(proposal.status)}
    >
      <FieldWrapper>
        <FieldTitleInListItem>Title</FieldTitleInListItem>
        <ToggleableItemInfo>
          <ToggleableItemInfoTop>
            <Subscription>{`ID: ${proposal.id}`}</Subscription>
            {!isPast && <Subscription>Created at: {toDDMMYY(displayDate)}</Subscription>}
            <BadgeStatus>{camelCaseToText(proposal.type)}</BadgeStatus>
          </ToggleableItemInfoTop>
          <ToggleableItemTitle>{proposal.title}</ToggleableItemTitle>
        </ToggleableItemInfo>
      </FieldWrapper>

      <FieldWrapper>
        <FieldTitleInListItem>Stage</FieldTitleInListItem>
        <StageField>
          <TextSmall bold>{camelCaseToText(proposal.status)}</TextSmall>
          <Tooltip
            tooltipText={checkStatus()}
            tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/proposal-system#proposal"
          >
            <TooltipDefault />
          </Tooltip>
        </StageField>
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitleInListItem>Proposer</FieldTitleInListItem>
        <MemberInfo member={proposal.proposer} memberSize="s" showIdOrText />
      </FieldWrapper>
      {isPast && (
        <FieldWrapper>
          <FieldTitleInListItem>Ended</FieldTitleInListItem>
          <StageField>
            <Subscription>{toDDMMYY(displayDate)}</Subscription>
          </StageField>
        </FieldWrapper>
      )}
      {isCouncilMember && (
        <FieldWrapper>
          <FieldTitleInListItem>My vote</FieldTitleInListItem>
          <StageField>
            <ProposalItemVoteDetails proposal={proposal} memberId={memberId} />
          </StageField>
        </FieldWrapper>
      )}
    </ProposalItem>
  )
}

const CopyButton = styled(CopyButtonTemplate)`
  justify-self: end;
  visibility: hidden;
  transition: none;
  & svg {
    transition: none !important;
  }
`

const ProposalItem = styled(TableListItem)`
  grid-column-gap: 36px;
  padding-right: 16px;
  background-color: ${({ $isPast }: { $isPast?: boolean }) => ($isPast ? Colors.Black[50] : Colors.White)};
  grid-template-rows: unset;
  height: 86px;
  &:hover ${CopyButton} {
    visibility: visible;
  }

  @media (max-width: 1439px) {
    padding: 16px;
    grid-template-columns: unset;
    grid-row-gap: 24px;
    height: fit-content;

    ${ToggleableItemInfo} {
      display: flex;
      flex-direction: column-reverse;
      gap: 4px;
      align-items: start;

      h5 {
        white-space: wrap;
      }
    }

    ${ToggleableItemInfoTop} {
      display: flex;
      flex-wrap: wrap;
      column-gap: 16px;
      row-gap: 4px;
    }
  }
`

export const StageField = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  width: fit-content;
  max-width: 100%;

  ${TextSmall} {
    ${Overflow.FullDots};
  }
`

const FieldTitleInListItem = styled.span`
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: left;
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  @media (min-width: 1440px) {
    ${FieldTitleInListItem} {
      display: none;
    }
  }
`
