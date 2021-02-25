import React from 'react'
import styled, { css } from 'styled-components'
import { MemberFieldsFragment } from '../api/queries'
import { FounderMemberIcon } from '../components/icons/FounderMemberIcon'
import { VerifiedMemberIcon } from '../components/icons/VerifiedMemberIcon'
import { BorderRad, Colors, Fonts, Transitions } from '../constants'
import { Avatar, AvatarImg } from './Avatar'

type MemberInfoProps = MemberInfoContainerProps & MemberOnDarkProps

interface MemberInfoContainerProps {
  member: MemberFieldsFragment
  onClick?: () => void
}

interface MemberOnDarkProps {
  isOnDark?: boolean
}

export const MemberInfo = React.memo(({ member, onClick, isOnDark }: MemberInfoProps) => {
  return (
    <MemberInfoWrap isOnDark={isOnDark}>
      <MemberPhoto>
        <Avatar avatarURI={member.avatarURI} />
      </MemberPhoto>
      <MemberHandle onClick={onClick}>{member.handle}</MemberHandle>
      <MemberIcons>
        {member.isVerified && <VerifiedMemberIcon />}
        {member.isFoundingMember && <FounderMemberIcon />}
      </MemberIcons>
      <MemberRoles>
        <MemberRole>LI</MemberRole>
      </MemberRoles>
    </MemberInfoWrap>
  )
})

export const MemberHandle = styled.span`
  grid-area: memberhandle;
  max-width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  font-family: ${Fonts.Grotesk};
  color: ${Colors.Black[900]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover {
    color: ${Colors.Black[700]};
  }
`

export const MemberIcons = styled.div`
  display: grid;
  grid-area: membericons;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  margin-left: -4px;
`

const MemberRoles = styled.div`
  display: grid;
  grid-area: memberroles;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
`

export const MemberRole = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Black[100]};
  font-size: 6px;
  line-height: 6px;
  font-family: ${Fonts.Inter};
  font-weight: 700;
  color: ${Colors.Black[600]};
  text-transform: uppercase;
`

const MemberPhoto = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  grid-area: memberphoto;

  ${AvatarImg} {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const MemberOnDarkStyles = css`
  ${MemberHandle} {
    color: ${Colors.Black[75]};
  }
  ${MemberIcons} {
    .memberCircle {
      stroke: ${Colors.Blue[500]};
      transition: ${Transitions.all};
    }
    .memberInner {
      fill: ${Colors.Blue[500]};
      transition: ${Transitions.all};
    }
  }
  ${MemberRole} {
    color: ${Colors.Black[300]};
    background-color: ${Colors.Black[600]};
    transition: ${Transitions.all};
  }
`

export const MemberInfoWrap = styled.div<MemberOnDarkProps>`
  display: grid;
  grid-template-columns: 40px auto 1fr;
  grid-template-rows: 20px 16px;
  grid-column-gap: 8px;
  grid-row-gap: 4px;
  grid-template-areas:
    'memberphoto memberhandle membericons'
    'memberphoto memberroles memberroles';
  align-items: center;
  width: 100%;
  justify-self: start;
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};

  ${(props) => props.isOnDark === true && MemberOnDarkStyles}
`

export const MemberDarkHover = css`
  ${MemberInfoWrap} {
    ${MemberHandle} {
      color: ${Colors.Black[50]};
    }
    ${MemberIcons} {
      .memberCircle {
        stroke: ${Colors.Blue[400]};
      }
      .memberInner {
        fill: ${Colors.Blue[400]};
      }
    }
    ${MemberRole} {
      color: ${Colors.Black[200]};
      background-color: ${Colors.Black[500]};
    }
  }
`
