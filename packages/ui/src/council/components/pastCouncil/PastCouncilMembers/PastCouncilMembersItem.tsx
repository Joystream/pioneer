import React, { useState } from 'react'
import styled from 'styled-components'

import { StatusBadge } from '@/app/pages/WorkingGroups/components/StatusBadges'
import { ButtonGhost } from '@/common/components/buttons'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { List, ListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'
import { PastCouncilMember } from '@/council/types/PastCouncilMember'
import { MemberInfo } from '@/memberships/components'
import { CountInfo } from '@/memberships/components/MemberListItem/Fileds'

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
            <PastCouncilListHeader>Proposals</PastCouncilListHeader>
            <PastCouncilListHeader>Stage</PastCouncilListHeader>
            <PastCouncilListHeader>Council Member Vote</PastCouncilListHeader>
          </PastCouncilMemberHeaders>
          <List>
            {councilMember.proposalVotes.map((proposalVote) => (
              <ListItem key={proposalVote.proposal.id}>
                <PastCouncilMemberWrapper>
                  <PastCouncilProposalWrap>
                    <div>
                      <ProposalBadge>{proposalVote.proposal.type}</ProposalBadge>
                      <TextBig bold>{proposalVote.proposal.title}</TextBig>
                    </div>
                    <TextBig bold>{capitalizeFirstLetter(proposalVote.proposal.status)}</TextBig>
                    <TextBig bold>{capitalizeFirstLetter(proposalVote.voteStatus)}</TextBig>
                    <ButtonGhost size="medium">Proposal details</ButtonGhost>
                  </PastCouncilProposalWrap>
                </PastCouncilMemberWrapper>
              </ListItem>
            ))}
          </List>
        </RowGapBlock>
        {/*{councilMember.proposalVotes.map((proposalVote) => (*/}
        {/*  <>{JSON.stringify(proposalVote, undefined, 2)}</>*/}
        {/*))}*/}
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

const ProposalBadge = styled(StatusBadge)`
  margin-bottom: 5px;
`
