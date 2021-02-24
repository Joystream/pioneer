import React from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../api/queries'
import { Colors } from '../constants'
import { Avatar } from './Avatar'

interface Props {
  member: MemberFieldsFragment
  onClick?: () => void
}

export const MemberInfo = React.memo(({ member, onClick }: Props) => {
  return (
    <>
      <MemberInfoWrap>
        <MemberPhoto>
          <Avatar avatarURI={member.avatarURI} />
        </MemberPhoto>
        <MemberHandle onClick={onClick}>
          {member.handle}
          {member.isVerified && <VerifiedMemberIcon />}
          {member.isFoundingMember && <FoundingMemberIcon />}
        </MemberHandle>
        <MemberRoles />
      </MemberInfoWrap>
    </>
  )
})

const MemberInfoWrap = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
  grid-template-rows: 20px 16px;
  grid-column-gap: 8px;
  grid-row-gap: 4px;
  grid-template-areas:
    'memberphoto memberhandle'
    'memberphoto memberroles';
  align-items: center;
  width: 100%;
  justify-self: start;
`

const MemberHandle = styled.p`
  font-weight: bold;
  cursor: pointer;
  grid-area: memberhandle;
`

const MemberRoles = styled.div`
  grid-area: memberroles;
`

const MemberPhoto = styled.div`
  grid-area: memberphoto;
`

const TempIcon = styled.span`
  width: 20px;
  height: 20px;
  margin: 0 0 0 4px;
  border-radius: 50%;
  border: 1px solid ${Colors.Blue[50]};
  color: ${Colors.LogoPurple};
  padding: 0;
  line-height: 17px;
  display: inline-block;
  font-size: 14px;
  text-align: center;
`

const VerifiedMemberIcon = () => <TempIcon>✓</TempIcon>

const FoundingMemberIcon = () => <TempIcon>⚑</TempIcon>
