import React from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../../../api/queries'
import { ButtonGhostMediumSquare, ButtonGhostSmallSquare } from '../../../components/buttons'
import { CrossIcon, TransferIcon } from '../../../components/icons'
import { MemberInfo } from '../../../components/MemberInfo'
import { BorderRad, Colors, Fonts, Sizes } from '../../../constants'
import { useToggle } from '../../../hooks/useToggle'
import { MembershipAbout } from './MembershipAbout'

interface MemberProps {
  member: MemberFieldsFragment
}

export const MemberItem = ({ member }: MemberProps) => {
  const [isAboutOpen, toggleAboutOpen] = useToggle()

  return (
    <MemberItemWrap>
      <MemberColumn>
        <MemberInfo member={member} onClick={toggleAboutOpen} />
        {isAboutOpen && <MembershipAbout member={member} onClose={toggleAboutOpen} />}
      </MemberColumn>
      <MemberColumn />
      <MemberColumn>
        <CountInfo>0 times</CountInfo>
      </MemberColumn>
      <MemberColumn>
        <CountInfo>0 times</CountInfo>
      </MemberColumn>
      <MemberColumn>
        <CountInfo>{member.inviteCount}</CountInfo>&nbsp;
        <ButtonGhostSmallSquare>
          <TransferIcon />
        </ButtonGhostSmallSquare>
      </MemberColumn>
      <MemberColumn>
        <CountInfo>0</CountInfo>
      </MemberColumn>
      <MemberControls>
        <ButtonGhostMediumSquare>
          <CrossIcon />
        </ButtonGhostMediumSquare>
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
  grid-template-columns: 260px 120px repeat(5, 80px);
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

const MemberColumn = styled.div``

const MemberControls = styled.div``
