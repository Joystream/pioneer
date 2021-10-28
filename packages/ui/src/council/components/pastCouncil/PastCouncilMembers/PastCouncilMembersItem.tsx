import React, { useState } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonGhost } from '@/common/components/buttons'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { List, ListItem, TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { camelCaseToText, capitalizeFirstLetter } from '@/common/helpers'
import { toDDMMYY } from '@/common/utils/dates'
import { PastCouncilMembersLayout } from '@/council/components/pastCouncil/PastCouncilMembers/PastCouncilMembers'
import { PastCouncilMember } from '@/council/types/PastCouncilMember'
import { MemberInfo } from '@/memberships/components'
import { CountInfo } from '@/memberships/components/MemberListItem/Fileds'
import { StageField } from '@/proposals/components/ProposalList/ProposalListItem'
import { isProposalActive } from '@/proposals/model/proposalStatus'
import {
  ToggleableItemInfo,
  ToggleableItemInfoTop,
  ToggleableItemTitle,
} from '@/working-groups/components/ToggleableItemStyledComponents'

interface Props {
  councilMember: PastCouncilMember
}

export const PastCouncilMembersItem = ({ councilMember }: Props) => {
  const [isDropped, setDropped] = useState(false)

  return (
    <PastCouncilMemberWrapper onClick={() => setDropped(!isDropped)} isDropped={isDropped}>
      <PastCouncilMemberWrap $colLayout={PastCouncilMembersLayout}>
        <MemberInfo member={councilMember.member} />
        <CountInfo count={councilMember.approvedProposals} />
        <CountInfo count={councilMember.rejectedProposals} />
        <CountInfo count={councilMember.slashedProposals} />
        <CountInfo count={councilMember.abstainedProposals} />
        <PastCouncilMemberControls>
          <DropDownButton onClick={() => setDropped(!isDropped)} isDropped={isDropped} />
        </PastCouncilMemberControls>
      </PastCouncilMemberWrap>
      <StyledDropDown isDropped={isDropped}>
        <RowGapBlock gap={4}>
          <PastCouncilMemberHeaders $colLayout={PastCouncilMemberProposalsLayout}>
            <PastCouncilListHeader>Proposal</PastCouncilListHeader>
            <PastCouncilListHeader>Stage</PastCouncilListHeader>
            <PastCouncilListHeader>Proposer</PastCouncilListHeader>
            <PastCouncilListHeader>Vote</PastCouncilListHeader>
          </PastCouncilMemberHeaders>
          <List>
            {councilMember.proposalVotes.map((proposalVote) => {
              const displayDate = new Date(
                !isProposalActive(proposalVote.proposal.status)
                  ? (proposalVote.proposal.endedAt as string)
                  : proposalVote.proposal.createdAt
              )

              return (
                <ListItem key={proposalVote.proposal.id}>
                  <PastCouncilProposalWrap>
                    <ToggleableItemInfo>
                      <ToggleableItemInfoTop>
                        <Subscription>
                          {!isProposalActive(proposalVote.proposal.status) ? 'Ended at:' : 'Created at:'}{' '}
                          {toDDMMYY(displayDate)}
                        </Subscription>
                        <BadgeStatus>{camelCaseToText(proposalVote.proposal.type)}</BadgeStatus>
                      </ToggleableItemInfoTop>
                      <ToggleableItemTitle>{proposalVote.proposal.title}</ToggleableItemTitle>
                    </ToggleableItemInfo>
                    <StageField>
                      <TextSmall bold>{camelCaseToText(proposalVote.proposal.status)}</TextSmall>
                      <Tooltip tooltipText="Lorem ipsum, dolor sit amet consectetur">
                        <TooltipDefault />
                      </Tooltip>
                    </StageField>
                    <MemberInfo member={proposalVote.proposal.proposer} memberSize="s" />
                    <TextMedium bold>{capitalizeFirstLetter(proposalVote.voteStatus)}</TextMedium>
                    <ButtonGhost size="medium">Proposal details</ButtonGhost>
                  </PastCouncilProposalWrap>
                </ListItem>
              )
            })}
          </List>
        </RowGapBlock>
      </StyledDropDown>
    </PastCouncilMemberWrapper>
  )
}

const PastCouncilMemberProposalsLayout = '2fr repeat(4, 1fr)'

const PastCouncilMemberWrapper = styled.div<{ isDropped?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  background-color: ${({ isDropped }) => (isDropped ? Colors.Black[50] : Colors.White)}
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const PastCouncilMemberWrap = styled(TableListItem)`
  height: ${Sizes.accountHeight};
  grid-column-gap: 24px;
  margin-top: -1px;
`

const PastCouncilMemberControls = styled.div`
  margin-right: 10px;
`

const StyledDropDown = styled(DropDownToggle)`
  row-gap: 16px;
  padding: 16px;
  background-color: ${Colors.Black[50]};
`

const PastCouncilMemberHeaders = styled(ListHeaders)`
  padding-right: 16px;
`
const PastCouncilListHeader = styled(ListHeader)`
  &:last-child {
    position: static;
    justify-content: flex-start;
    text-align: left;
  }
`

export const PastCouncilProposalWrap = styled.div`
  display: grid;
  grid-template-columns: ${PastCouncilMemberProposalsLayout};
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
