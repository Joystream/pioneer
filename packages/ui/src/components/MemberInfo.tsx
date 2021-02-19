import React from 'react'
import styled from 'styled-components'
import { Member } from '../common/types'
import { Avatar } from './Avatar'
import { Text } from './typography'

interface Props {
  member: Member
}

export const MemberInfo = React.memo(({ member }: Props) => {
  return (
    <>
      <MemberInfoWrap>
        <MemberPhoto>
          <Avatar avatarURI={member.avatarURI} />
        </MemberPhoto>
        <MemberHandle>{member.handle}</MemberHandle>
        <MemberName size={2}>{member.name}</MemberName>
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
    'memberphoto membername';
  align-items: center;
  width: 100%;
  justify-self: start;
`

const MemberHandle = styled.p`
  font-weight: bold;
  cursor: pointer;
  grid-area: memberhandle;
`

const MemberName = styled(Text)`
  grid-area: membername;
`

const MemberPhoto = styled.div`
  grid-area: memberphoto;
`
