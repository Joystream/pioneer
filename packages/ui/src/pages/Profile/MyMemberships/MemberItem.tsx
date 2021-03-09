import React from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../../common/types'
import { ButtonGhostMediumSquare } from '../../../components/buttons'
import { ArrowOutsideIcon } from '../../../components/icons'
import { MemberInfo, MemberRole } from '../../../components/membership/MemberInfo'
import { MemberProfile } from '../../../components/membership/MemberProfile'
import { BorderRad, Colors, Fonts, Sizes } from '../../../constants'
import { useToggle } from '../../../hooks/useToggle'
import { TransferInviteButton } from '../../../components/TransferInviteButton'

interface Props {
  member: BaseMember
}

export const MemberItem = ({ member }: Props) => {
  const [isAboutOpen, toggleAboutOpen] = useToggle()

  return (
    <MemberItemWrap>
      <MemberColumn>
        <MemberInfo member={member} onClick={toggleAboutOpen} showId />
        {isAboutOpen && <MemberProfile member={member} onClose={toggleAboutOpen} />}
      </MemberColumn>
      <MemberRolesColumn>
        <MemberRole>SL</MemberRole>
        <MemberRole>SP</MemberRole>
        <MemberRole>RL</MemberRole>
        <MemberRole>LI</MemberRole>
        <MemberRole>SR</MemberRole>
      </MemberRolesColumn>
      <MemberColumn>
        <CountInfo>0 times</CountInfo>
      </MemberColumn>
      <MemberColumn>
        <CountInfo>0 times</CountInfo>
      </MemberColumn>
      <MemberColumn>
        <CountInfo>{member.inviteCount}</CountInfo>
        <TransferInviteButton member={member} />
      </MemberColumn>
      <MemberColumn>
        <CountInfo>0</CountInfo>
      </MemberColumn>
      <MemberControls>
        <ButtonForTransfer>
          <ArrowOutsideIcon />
        </ButtonForTransfer>
      </MemberControls>
    </MemberItemWrap>
  )
}

const CountInfo = styled.span`
  font-family: ${Fonts.Grotesk};
  font-weight: 700;
`

const MemberItemWrap = styled.li`
  display: grid;
  grid-template-columns: 194px 200px 76px 76px 96px 76px 54px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 0 16px 14px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};

  & + & {
    margin-top: -1px;
  }
`

const MemberColumn = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  align-items: center;
  width: fit-content;
  max-width: 100%;
`

const MemberRolesColumn = styled(MemberColumn)`
  grid-template-columns: repeat(auto-fill, 24px);
  grid-auto-flow: dense;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
  width: 100%;
  max-width: 164px;
  max-height: 52px;
  overflow: hidden;

  ${MemberRole} {
    width: 24px;
    height: 24px;
    font-size: 10px;
  }
`

const MemberControls = styled.div``

const ButtonForTransfer = styled(ButtonGhostMediumSquare)`
  svg {
    color: ${Colors.Black[900]};
  }
`
