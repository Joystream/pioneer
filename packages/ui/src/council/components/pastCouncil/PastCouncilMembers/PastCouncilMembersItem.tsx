import React, { useState } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonGhost } from '@/common/components/buttons'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { List, ListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { camelCaseToText, capitalizeFirstLetter } from '@/common/helpers'
import { PastCouncilMember } from '@/council/types/PastCouncilMember'
import { MemberInfo } from '@/memberships/components'
import { CountInfo } from '@/memberships/components/MemberListItem/Fileds'
import { isProposalActive } from '@/proposals/model/proposalStatus'
import {
  ToggleableItemInfo,
  ToggleableItemInfoTop,
  ToggleableItemTitle,
} from '@/working-groups/components/ToggleableItemStyledComponents'

interface Props {
  councilMember: PastCouncilMember
}

const CouncilMembersLayout = '2fr 1fr 1fr 2fr'

export const PastCouncilMembersItem = ({ councilMember }: Props) => {
  const [isDropped, setDropped] = useState(false)

  return (
    <PastCouncilMemberWrapper onClick={() => setDropped(!isDropped)} isDropped={isDropped}>
      <PastCouncilMemberWrap>
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
          <PastCouncilMemberHeaders $colLayout={CouncilMembersLayout}>
            <PastCouncilListHeader>Proposal</PastCouncilListHeader>
            <PastCouncilListHeader>Stage</PastCouncilListHeader>
            <PastCouncilListHeader>Vote</PastCouncilListHeader>
          </PastCouncilMemberHeaders>
          <List>
            {councilMember.proposalVotes.map((proposalVote) => {
              const date = new Date(
                !isProposalActive(proposalVote.proposal.status)
                  ? (proposalVote.proposal.endedAt as string)
                  : proposalVote.proposal.createdAt
              )

              return (
                <ListItem key={proposalVote.proposal.id}>
                  <PastCouncilMemberWrapper>
                    <PastCouncilProposalWrap>
                      <ToggleableItemInfo>
                        <ToggleableItemInfoTop>
                          <Subscription>
                            {!isProposalActive(proposalVote.proposal.status) ? 'Ended at:' : 'Created at:'}{' '}
                            {date.toLocaleDateString('en-GB')}
                          </Subscription>
                          <BadgeStatus>{camelCaseToText(proposalVote.proposal.type)}</BadgeStatus>
                        </ToggleableItemInfoTop>
                        <ToggleableItemTitle>{proposalVote.proposal.title}</ToggleableItemTitle>
                      </ToggleableItemInfo>
                      <TextMedium bold>{camelCaseToText(proposalVote.proposal.status)}</TextMedium>
                      <TextMedium bold>{capitalizeFirstLetter(proposalVote.voteStatus)}</TextMedium>
                      <ButtonGhost size="medium">Proposal details</ButtonGhost>
                    </PastCouncilProposalWrap>
                  </PastCouncilMemberWrapper>
                </ListItem>
              )
            })}
          </List>
        </RowGapBlock>
      </StyledDropDown>
    </PastCouncilMemberWrapper>
  )
}

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

export const PastCouncilProposalWrap = styled.div`
  display: grid;
  grid-template-columns: ${CouncilMembersLayout};
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

export const PastCouncilMemberWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(4, 128px) 104px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;

  > *:last-child {
    justify-self: end;
  }
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
