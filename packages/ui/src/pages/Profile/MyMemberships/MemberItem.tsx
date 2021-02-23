import React, { useState } from 'react'
import styled from 'styled-components'
import { Member } from '../../../common/types'
import { Avatar } from '../../../components/Avatar'
import { ButtonGhostMediumSquare, ButtonGhostSmallSquare } from '../../../components/buttons'
import { CrossIcon, TransferIcon } from '../../../components/icons'
import { BorderRad, Colors, Fonts, Sizes } from '../../../constants'
import { MembershipAbout } from './MembershipAbout'

interface MemberProps {
  member: Member
}

export const MemberItem = ({ member }: MemberProps) => {
  const [isAboutOpen, setAboutOpen] = useState(false)

  return (
    <MemberItemWrap>
      <MemberInfo>
        <Avatar avatarURI={member.avatarURI} />
        <MemberHandle onClick={() => setAboutOpen(true)}>{member.handle}</MemberHandle>
      </MemberInfo>
      <MemberInfo />
      <MemberInfo>
        <CountInfo>0 times</CountInfo>
      </MemberInfo>
      <MemberInfo>
        <CountInfo>1 times</CountInfo>
      </MemberInfo>
      <MemberInfo>
        <CountInfo>2</CountInfo>
        <ButtonGhostSmallSquare>
          <TransferIcon />
        </ButtonGhostSmallSquare>
      </MemberInfo>
      <MemberInfo>
        <CountInfo>0</CountInfo>
      </MemberInfo>
      <MemberControls>
        <ButtonGhostMediumSquare>
          <CrossIcon />
        </ButtonGhostMediumSquare>
        {isAboutOpen && <MembershipAbout member={member} onClose={() => setAboutOpen(false)} />}
      </MemberControls>
    </MemberItemWrap>
  )
}

const CountInfo = styled.span`
  font-family: ${Fonts.Title};
  font-weight: 700;
`

const MemberHandle = styled.a`
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`

const MemberItemWrap = styled.li`
  display: grid;
  grid-template-columns: 170px 170px repeat(5, 60px);
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

const MemberInfo = styled.div``

const MemberControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 40px);
  grid-template-rows: 40px;
  grid-column-gap: 8px;
`
