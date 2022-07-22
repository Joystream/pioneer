import React, { useState } from 'react'
import styled from 'styled-components'

import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { List, ListItem, TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { PastCouncilMembersLayout } from '@/council/components/pastCouncil/PastCouncilMembers/PastCouncilMembers'
import { PastCouncilProposalsItem } from '@/council/components/pastCouncil/PastCouncilProposals/PastCouncilProposalsItem'
import { PastCouncilTabsHeaders } from '@/council/components/pastCouncil/PastCouncilTabs'
import { PastCouncilMember } from '@/council/types/PastCouncilMember'
import { MemberInfo } from '@/memberships/components'
import { CountInfo } from '@/memberships/components/MemberListItem/Fields'

interface Props {
  councilMember: PastCouncilMember
}

export const PastCouncilMembersItem = ({ councilMember }: Props) => {
  const [isDropped, setDropped] = useState(false)

  return (
    <PastCouncilMemberWrapper onClick={() => setDropped(!isDropped)} isDropped={isDropped}>
      <PastCouncilMemberWrap $colLayout={PastCouncilMembersLayout} borderless as="div">
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
          <PastCouncilTabsHeaders $colLayout={PastCouncilMemberProposalsLayout}>
            <ListHeader>Proposal</ListHeader>
            <ListHeader>Stage</ListHeader>
            <ListHeader>Proposer</ListHeader>
            <ListHeader>Vote</ListHeader>
          </PastCouncilTabsHeaders>
          <List>
            {councilMember.proposalVotes.map((proposalVote) => (
              <ListItem key={proposalVote.proposal.id}>
                <PastCouncilProposalsItem proposal={proposalVote.proposal} vote={proposalVote.voteStatus} />
              </ListItem>
            ))}
          </List>
        </RowGapBlock>
      </StyledDropDown>
    </PastCouncilMemberWrapper>
  )
}

export const PastCouncilMemberProposalsLayout = '2fr repeat(4, 1fr)'

const PastCouncilMemberWrapper = styled(ListItem)<{ isDropped?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  background-color: ${({ isDropped }) => (isDropped ? Colors.Black[50] : Colors.White)};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  overflow: hidden;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const PastCouncilMemberWrap = styled(TableListItem)`
  height: ${Sizes.accountHeight};
  grid-column-gap: 24px;
`

const PastCouncilMemberControls = styled.div`
  margin-right: 10px;
`

const StyledDropDown = styled(DropDownToggle)`
  row-gap: 16px;
  padding: 16px;
  background-color: ${Colors.Black[50]};
`
