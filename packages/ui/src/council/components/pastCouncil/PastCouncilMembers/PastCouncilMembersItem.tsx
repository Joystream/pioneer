import React, { useState } from 'react'
import styled from 'styled-components'

import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { PastCouncilMember } from '@/council/types/PastCouncilMember'
import { MemberInfo } from '@/memberships/components'
import { CountInfo } from '@/memberships/components/MemberListItem/Fileds'

interface Props {
  councilMember: PastCouncilMember
}

export const PastCouncilMembersItem = ({ councilMember }: Props) => {
  const [isDropped, setDropped] = useState(false)

  return (
    <PastCouncilMemberWrapper onClick={() => setDropped(!isDropped)}>
      <PastCouncilMemberWrap>
        <MemberInfo member={councilMember.member} />
        <CountInfo count={councilMember.acceptedProposals} />
        <CountInfo count={councilMember.rejectedProposals} />
        <CountInfo count={councilMember.slashedProposals} />
        <CountInfo count={councilMember.abstainedProposals} />
        <PastCouncilMemberControls>
          <DropDownButton onClick={() => setDropped(!isDropped)} isDropped={isDropped} />
        </PastCouncilMemberControls>
      </PastCouncilMemberWrap>
      <StyledDropDown isDropped={isDropped}>
        <>Proposals here</>
      </StyledDropDown>
    </PastCouncilMemberWrapper>
  )
}

const PastCouncilMemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const PastCouncilMemberWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(4, 128px) 104px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;
`

const PastCouncilMemberControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 32px);
  grid-template-rows: 32px;
  grid-column-gap: 4px;
`

const StyledDropDown = styled(DropDownToggle)`
  row-gap: 16px;
  padding: 16px;
  background-color: ${Colors.Black[50]};
`
